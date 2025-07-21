declare module 'd3-format' {
  export function format(specifier: string): (value: number) => string;
  export function formatLocale(definition: FormatLocaleDefinition): {
    format: (specifier: string) => (value: number) => string;
  };
  export interface FormatLocaleDefinition {
    decimal: string;
    thousands: string;
    grouping: number[];
    currency: [string, string];
    percent: string;
    numerals?: string[];
    minus?: string;
    nan?: string;
  }
} 