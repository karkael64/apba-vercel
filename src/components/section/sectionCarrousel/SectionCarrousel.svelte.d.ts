import type { SvelteEvent } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';
import type { CarrouselPicture as CarrouselPictureInner } from '../../molecule/carrousel/Carrousel.svelte';

export type CarrouselPicture = CarrouselPictureInner;

export type SectionCarrouselProps = {
  pictures: CarrouselPicture[];
  duration: number | undefined;
  height: string | number | undefined;
};

declare class SectionCarrousel extends SvelteComponentTyped<
  SectionCarrouselProps,
  { save: SvelteEvent<string> }
> {}

export default SectionCarrousel;
