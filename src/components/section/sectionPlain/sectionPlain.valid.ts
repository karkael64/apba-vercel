import type { SectionPlainProps } from './SectionPlain.svelte';
import {
  type AnyObject,
  type JSONSchemaFromType,
  expectString,
  isValid,
  hasErrors
} from '../../../util/common';

const schemaSectionPlain: JSONSchemaFromType<SectionPlainProps> = {
  properties: { body: expectString() },
  required: []
};

export const isValidSectionPlain = (obj: AnyObject): obj is SectionPlainProps =>
  isValid(obj, schemaSectionPlain);
export const hasErrorsSectionPlain = (obj: AnyObject) => hasErrors(obj, schemaSectionPlain);
