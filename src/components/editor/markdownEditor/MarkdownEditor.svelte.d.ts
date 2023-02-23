import { SvelteComponentTyped } from 'svelte';

export type MarkdownEditorProps = { markdown: string };

declare class MarkdownEditor extends SvelteComponentTyped<MarkdownEditorProps> {}

export default MarkdownEditor;
