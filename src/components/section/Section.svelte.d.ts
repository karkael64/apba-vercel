import { SvelteComponentTyped } from 'svelte';

export type SectionProps = { body?: string };

declare class Section extends SvelteComponentTyped<{
  section: prisma.BlogSection;
}> {}

export default Section;
