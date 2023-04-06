export { default as SectionSplash } from './sectionSplash/SectionSplash.svelte';
export { default as SectionThumbs } from './sectionThumbs/SectionThumbs.svelte';
export { default as SectionPlain } from './sectionPlain/SectionPlain.svelte';
export { default as SectionCarrousel } from './sectionCarrousel/SectionCarrousel.svelte';
export { default as Section } from './Section.svelte';

import { hasErrorsSectionPlain, isValidSectionPlain } from './sectionPlain/sectionPlain.valid';
import { hasErrorsSectionSplash, isValidSectionSplash } from './sectionSplash/sectionSplash.valid';
import { hasErrorsSectionThumbs, isValidSectionThumbs } from './sectionThumbs/sectionThumbs.valid';
import {
  hasErrorsSectionCarrousel,
  isValidSectionCarrousel
} from './sectionCarrousel/sectionCarrousel.valid';

export const modelValidation = {
  SectionPlain: isValidSectionPlain,
  SectionSplash: isValidSectionSplash,
  SectionThumbs: isValidSectionThumbs,
  SectionCarrousel: isValidSectionCarrousel
};

export const modelErrors = {
  SectionPlain: hasErrorsSectionPlain,
  SectionSplash: hasErrorsSectionSplash,
  SectionThumbs: hasErrorsSectionThumbs,
  SectionCarrousel: hasErrorsSectionCarrousel
};

export const isModelName = (el: string): el is keyof typeof modelValidation =>
  el in modelValidation;
