import localFont from 'next/font/local';

// Archivo variable: wght 100 to 900, wdth 62 to 125 (one family, two voices).
export const archivo = localFont({
  src: '../fonts/archivo-latin-standard-normal.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-archivo',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
});

export const mono = localFont({
  src: '../fonts/martian-mono-latin-400-normal.woff2',
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
});
