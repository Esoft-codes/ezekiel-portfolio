// A workflow node chip. Decorative narration of the concept, hidden from assistive tech.
export function Node({ type, name, ms = '0.2s', lane, free }: { type: string; name: string; ms?: string; lane?: 'create'; free?: boolean }) {
  return (
    <div className={`node mono${lane ? ' lane-create' : ''}${free ? ' node--free' : ''}`} data-node data-ms={ms} aria-hidden="true">
      <span className="node__dot" />
      <span className="node__type">{type}</span>
      <span className="node__name">{name}</span>
      <span className="node__status" data-ms={ms} />
    </div>
  );
}
