import { SvelteComponentTyped } from 'svelte';
import { type ButtonProps } from '../../atoms';
import { type PictureEditorProps } from '../../editor';

export type SectionSplashProps = {
  buttonList: ButtonProps[];
  backgroundImages: PictureEditorProps[];
  height?: string;
  body?: string;
  variant?: 'left' | 'right';
};

declare class SectionSplash extends SvelteComponentTyped<
  SectionSplashProps,
  { save: SvelteEvent<string> }
> {}

export default SectionSplash;
