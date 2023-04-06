import type { SectionCarrouselProps } from './SectionCarrousel.svelte';
import {
  type AnyObject,
  type JSONSchemaFromType,
  expectString,
  isValid,
  hasErrors,
  expectNumber
} from '../../../util/common';

const schemaSectionCarrousel: JSONSchemaFromType<SectionCarrouselProps> = {
  properties: {
    pictures: {
      type: 'array',
      items: { type: 'object', properties: { alt: { type: 'string' }, src: { type: 'string' } } },
      minItems: 1
    },
    duration: expectNumber(),
    height: { anyOf: [expectString(), expectNumber()] }
  },
  required: []
};

export const isValidSectionCarrousel = (obj: AnyObject): obj is SectionCarrouselProps =>
  isValid(obj, schemaSectionCarrousel);
export const hasErrorsSectionCarrousel = (obj: AnyObject) => hasErrors(obj, schemaSectionCarrousel);
