import { SvelteComponentTyped } from 'svelte';

declare class ImageLoader extends SvelteComponentTyped<{
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  transitionDuration?: number;
  filter?: string | number;
}> {}

export default ImageLoader;
