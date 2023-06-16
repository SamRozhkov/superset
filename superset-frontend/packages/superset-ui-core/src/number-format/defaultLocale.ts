import { FormatLocaleDefinition } from 'd3-format';

const formatLocale: FormatLocaleDefinition = {
  currency: ['', '\u00a0\u20bd'],
  thousands: '\u00a0',
  grouping: [3],
  decimal: ',',
};

export const DEFALT_D3_FORMAT_PREFIXIES = {
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
