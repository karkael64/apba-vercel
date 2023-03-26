import { SvelteComponentTyped } from 'svelte';

export type ButtonColor = 'primary' | 'secondary' | 'editor';
export type ButtonShape = 'square' | 'round' | 'circle';

declare class Button extends SvelteComponentTyped<
  {
    href?: string;
    color?: ButtonColor;
    shape?: ButtonShape;
    disabled?: boolean;
  },
  {
    click: Event;
  },
  {
    default: string | SvelteComponentTyped;
  }
> {}

export default Button;
