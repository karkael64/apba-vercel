import { SvelteComponentTyped } from 'svelte';
import { type SectionSplashProps } from './SectionSplash.svelte';

declare class SectionSplash extends SvelteComponentTyped<
  SectionSplashProps,
  { save: SvelteEvent<string> }
> {}

export default SectionSplash;
