import { SvelteComponentTyped } from 'svelte';
import { type SectionCarrouselProps } from './SectionCarrousel.svelte';

declare class SectionCarrousel extends SvelteComponentTyped<
  SectionCarrouselProps,
  { save: SvelteEvent<string> }
> {}

export default SectionCarrousel;
