import { SvelteComponentTyped } from 'svelte';

declare class Image extends SvelteComponentTyped<{
  src: string;
  alt: string;
  transitionDuration?: number;
  filter?: string | number;
}> {}

export default Image;
