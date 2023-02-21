import type { SvelteEvent } from '$lib/client';
import { SvelteComponentTyped } from 'svelte';

declare class EditorButton extends SvelteComponentTyped<
  { markdown?: string; inner?: boolean },
  { save: SvelteEvent<string> }
> {}

export default EditorButton;
