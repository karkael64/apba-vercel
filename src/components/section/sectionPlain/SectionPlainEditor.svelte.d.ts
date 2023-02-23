import type { SvelteEvent } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';
import { type SectionPlainProps } from './SectionPlain.svelte';

declare class SectionPlainEditor extends SvelteComponentTyped<
  SectionPlainProps,
  { save: SvelteEvent<string> }
> {}

export default SectionPlainEditor;
