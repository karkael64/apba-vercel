type ColorName =
  | 'positive'
  | 'bonus'
  | 'medium'
  | 'minus'
  | 'negative'
  | 'primary'
  | 'secondary'
  | 'sinopia'
  | 'burntSienna';

export const colors: Record<ColorName | ColorLightName, string>;
export const dark: Record<ColorName, string>;
export const light: Record<ColorLightName, string>;
