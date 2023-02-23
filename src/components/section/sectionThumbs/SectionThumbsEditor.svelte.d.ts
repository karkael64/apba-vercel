import { SvelteComponentTyped } from 'svelte';
import type { SectionThumbsProps } from './SectionThumbs.svelte';

declare class SectionThumbs extends SvelteComponentTyped<
  SectionThumbsProps,
  { save: SvelteEvent<string> }
> {}

export default SectionThumbs;
