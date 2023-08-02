import { FormatLocaleDefinition } from 'd3-format';

const formatLocale: FormatLocaleDefinition = {
  currency: ['', '\u00a0\u20bd'],
  thousands: '\u00a0',
  grouping: [3],
  decimal: ',',
};

export interface FormatLocalePrefixies {
  y: string;
  z: string;
  a: string;
  f: string;
  p: string;
  n: string;
  µ: string;
  m: string;
  '': string;
  k: string;
  M: string;
  G: string;
  T: string;
  P: string;
  E: string;
  Z: string;
  Y: string;
}
export const DEFALT_D3_FORMAT_PREFIXIES: FormatLocalePrefixies = {
  y: 'e-22',
  z: 'e-21',
  a: 'а',
  f: 'ф',
  p: 'п',
  n: 'н',
  µ: 'мк',
  m: 'м',
  '': '',
  k: 'тыс.',
  M: 'млн',
  G: 'млрд',
  T: 'Т',
  P: 'П',
  E: 'Э',
  Z: 'Z',
  Y: 'Y',
};
export default formatLocale;
