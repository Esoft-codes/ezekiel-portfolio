'use client';
import { useEffect, useRef, useState } from 'react';

type State = 'idle' | 'connecting' | 'live' | 'ended' | 'error' | 'nomic' | 'blocked' | 'asking';
type Line = { role: 'assistant' | 'user'; text: string };
type VapiLike = {
  start: (id: string) => Promise<unknown>;
  stop: () => Promise<void>;
  setMuted: (m: boolean) => void;
  on: (e: string, cb: (x?: unknown) => void) => void;
};

// Live AI receptionist demo: talks in the browser through Vapi. Loaded only when the visitor presses the button.
export function VoiceDemo({ publicKey, assistantId }: { publicKey: string; assistantId: string }) {
  const [state, setState] = useState<State>('idle');
  const [muted, setMuted] = useState(false);
  const [talking, setTalking] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [detail, setDetail] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const vapi = useRef<VapiLike | null>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [lines]);
  useEffect(() => () => { vapi.current?.stop().catch(() => {}); }, []);

  const start = async () => {
    setLines([]);
    setDetail('');
    // Ask for the microphone first, so the browser's permission pop-up appears straight away.
    // Only a clear "blocked" answer stops here; anything else still tries the call.
    setState('asking');
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        s.getTracks().forEach((t) => t.stop());
      } catch (e) {
        const name = (e as { name?: string })?.name || 'Error';
        console.warn('[voice demo] microphone check:', name, e);
        if (name === 'NotAllowedError' || name === 'SecurityError') { setState('blocked'); return; }
        setDetail(name);
      }
    }
    setState('connecting');
    try {
      if (!vapi.current) {
        const { default: Vapi } = await import('@vapi-ai/web');
        const v = new Vapi(publicKey) as unknown as VapiLike;
        v.on('call-start', () => { if (timer.current) clearTimeout(timer.current); setState('live'); });
        v.on('call-start-failed', (x) => { console.warn('[voice demo] start failed', x); setState('error'); });
        v.on('call-end', () => { setState('ended'); setTalking(false); setMuted(false); });
        v.on('speech-start', () => setTalking(true));
        v.on('speech-end', () => setTalking(false));
        v.on('error', (x) => { console.warn('[voice demo] error', x); setState((s) => (s === 'live' ? 'ended' : 'error')); });
        v.on('message', (m) => {
          const msg = m as { type?: string; transcriptType?: string; role?: string; transcript?: string };
          if (msg?.type === 'transcript' && msg.transcriptType === 'final' && msg.transcript) {
            const role = msg.role === 'assistant' ? 'assistant' : 'user';
            setLines((l) => {
              const last = l[l.length - 1];
              if (last && last.role === role) return [...l.slice(0, -1), { role, text: `${last.text} ${msg.transcript}` }];
              return [...l.slice(-30), { role, text: msg.transcript as string }];
            });
          }
        });
        vapi.current = v;
      }
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { setState((s) => { if (s === 'connecting') { vapi.current?.stop().catch(() => {}); return 'error'; } return s; }); }, 25000);
      await vapi.current.start(assistantId);
    } catch (e) {
      console.warn('[voice demo] could not start', e);
      setState('error');
    }
  };

  const stop = () => { vapi.current?.stop().catch(() => {}); setState('ended'); };
  const toggleMute = () => { const m = !muted; vapi.current?.setMuted(m); setMuted(m); };

  const live = state === 'live';
  return (
    <div className={`vd${live ? ' is-live' : ''}${talking ? ' is-talking' : ''}`}>
      <div className="vd__panel">
        <div className="vd__who">
          <span className="vd__orb" aria-hidden="true"><i /><i /><i /></span>
          <span>
            <span className="vd__name">Ava, Maple Grove Dental</span>
            <span className="vd__status mono" role="status" aria-live="polite">
              {state === 'idle' && 'Ready when you are'}
              {state === 'asking' && 'Allow the microphone in the pop-up to start the call'}
              {state === 'connecting' && 'Connecting to Ava…'}
              {state === 'live' && (talking ? 'Ava is speaking' : 'Listening')}
              {state === 'ended' && 'Call ended. Try it again any time.'}
              {state === 'error' && `Could not connect${detail ? ` (microphone: ${detail})` : ''}. Check your microphone and try again.`}
              {state === 'nomic' && 'This browser can’t reach a microphone.'}
              {state === 'blocked' && 'Your browser is blocking the microphone for this site.'}
            </span>
          </span>
        </div>
        <div className="vd__ctl">
          {!live && state !== 'connecting' && state !== 'asking' && (
            <button type="button" className="btn btn--solid vd__call" onClick={start}>
              {state === 'ended' ? 'Call again' : state === 'nomic' || state === 'error' || state === 'blocked' ? 'Try again' : 'Talk to the AI receptionist'}<span className="btn__arrow" aria-hidden="true">→</span>
            </button>
          )}
          {(state === 'connecting' || state === 'asking') && <button type="button" className="btn btn--ghost" disabled>{state === 'asking' ? 'Waiting for microphone…' : 'Connecting…'}</button>}
          {live && (
            <>
              <button type="button" className="btn btn--ghost" onClick={toggleMute} aria-pressed={muted}>{muted ? 'Unmute' : 'Mute'}</button>
              <button type="button" className="btn btn--solid vd__end" onClick={stop}>End call</button>
            </>
          )}
        </div>
        {state === 'nomic' && (
          <p className="vd__help">Open this page in Chrome, Edge or Safari and press the button again; your browser will ask to use the microphone. If it still fails on a laptop, check the microphone is switched on and that your computer’s privacy settings let the browser use it.</p>
        )}
        {state === 'blocked' && (
          <p className="vd__help">To turn it back on, click the lock or settings icon at the left of the address bar, set <b>Microphone</b> to <b>Allow</b>, then press Try again. On a phone, allow the microphone for your browser in the phone’s settings.</p>
        )}
        {lines.length > 0 && (
          <div className="vd__log" ref={log} aria-label="Live transcript">
            {lines.map((l, i) => (
              <p key={i} className={`vd__line vd__line--${l.role}`}><span className="mono">{l.role === 'assistant' ? 'Ava' : 'You'}</span>{l.text}</p>
            ))}
          </div>
        )}
      </div>
      <ul className="vd__try" aria-label="Things to try">
        <li>“I’d like to book a cleaning for Thursday.”</li>
        <li>“How much is teeth whitening?”</li>
        <li>“I have a bad toothache, can I come in today?”</li>
        <li>“Can I speak to a real person?”</li>
      </ul>
    </div>
  );
}
