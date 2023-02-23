import type { SvelteComponent } from 'svelte';
import { SvelteComponentTyped } from 'svelte';

declare class EditorModal extends SvelteComponentTyped<
  { open?: boolean; title: string; inner?: boolean },
  { save: Event },
  { default: SvelteComponent }
> {}

export default EditorModal;
