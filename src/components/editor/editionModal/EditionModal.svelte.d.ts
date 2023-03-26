import type { SvelteComponent } from 'svelte';
import { SvelteComponentTyped } from 'svelte';

type EditionModalMode = 'create' | 'update';

declare class EditionModal extends SvelteComponentTyped<
  { open?: boolean; title: string; mode?: EditionModalMode },
  { create: Event; update: Event; delete: Event },
  { default: SvelteComponent }
> {}

export default EditionModal;
