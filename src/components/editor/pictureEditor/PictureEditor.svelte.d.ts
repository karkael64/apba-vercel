import { SvelteComponentTyped } from 'svelte';

export type PictureEditorProps = {
  url: string;
  alt: string;
};

declare class PictureEditor extends SvelteComponentTyped<PictureEditorProps> {}

export default PictureEditor;
