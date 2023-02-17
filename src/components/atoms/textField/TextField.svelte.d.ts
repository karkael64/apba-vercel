import { SvelteComponentTyped } from 'svelte';

declare class TextField extends SvelteComponentTyped<
  {
    type: string;
    name: string;
    label: string;
    value?: string;
    /** error can be an empty string to hold a space after input */
    error?: string;
    /** placeholder can be an empty string to force label to stay out of input */
    placeholder?: string;
  },
  { focus: Event; blur: Event; input: Event; enter: Event }
> {}

export default TextField;
