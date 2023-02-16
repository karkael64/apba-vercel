import { SvelteComponentTyped } from 'svelte';

declare class TextField extends SvelteComponentTyped<
  { type: string; name: string; label: string; error?: string; value?: string },
  { focus: Event; blur: Event; input: Event; enter: Event }
> {}

export default TextField;
