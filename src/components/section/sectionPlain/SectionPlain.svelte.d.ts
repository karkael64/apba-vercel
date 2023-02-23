import type { SvelteEvent } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

export type SectionPlainProps = { body?: string };

declare class SectionPlain extends SvelteComponentTyped<
  SectionPlainProps,
  { save: SvelteEvent<string> }
> {}

export default SectionPlain;
