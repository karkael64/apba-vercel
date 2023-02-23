import { SvelteComponentTyped } from 'svelte';

declare class TextArea extends SvelteComponentTyped<
  { label: string; value?: string },
  { focus: Event; blur: Event; input: Event; enter: Event }
> {}

export default TextArea;
