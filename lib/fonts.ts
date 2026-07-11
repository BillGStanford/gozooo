import { Noto_Serif_Ethiopic, Source_Serif_4, Inter, IBM_Plex_Mono } from 'next/font/google';

export const displayAm = Noto_Serif_Ethiopic({
  subsets: ['ethiopic', 'latin'],
  weight: ['500', '700'],
  variable: '--font-display-am',
  display: 'swap',
});

export const bodyAm = Noto_Serif_Ethiopic({
  subsets: ['ethiopic', 'latin'],
  weight: ['400', '500'],
  variable: '--font-body-am',
  display: 'swap',
});

export const display = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const body = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const utility = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-utility',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const fontVariables = [
  displayAm.variable,
  bodyAm.variable,
  display.variable,
  body.variable,
  utility.variable,
  mono.variable,
].join(' ');
