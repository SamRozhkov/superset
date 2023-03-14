import { FormatLocaleDefinition } from 'd3-format';

const formatLocale: FormatLocaleDefinition = {
  currency: ['', '\u00a0\u20bd'],
  thousands: '\u00a0',
  grouping: [3],
  decimal: ',',
};

export default formatLocale;
