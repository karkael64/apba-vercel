import type { AnyObject, SvelteEvent } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

declare class MarkdownEditor extends SvelteComponentTyped<
  { open?: boolean; text: string },
  AnyObject,
  { save: SvelteEvent<string> }
> {}

export default MarkdownEditor;
