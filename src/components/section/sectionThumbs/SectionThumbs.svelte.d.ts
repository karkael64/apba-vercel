import { SvelteComponentTyped } from 'svelte';

export type Thumb = {
  pictureUrl: string;
  pictureAlt: string;
  buttonHref?: string;
  buttonLabel?: string;
  buttonColor?: 'primary' | 'secondary';
  body: string;
};

export type SectionThumbsProps = { thumbs: Thumb[] };

declare class SectionThumbs extends SvelteComponentTyped<
  SectionThumbsProps,
  { save: SvelteEvent<string> }
> {}

export default SectionThumbs;
