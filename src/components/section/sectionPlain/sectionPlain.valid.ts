import type { SectionPlainProps } from './SectionPlain.svelte';
import type { AnyObject } from '../../common/ambient';
import type { JSONSchemaFromType } from '../../common/jsonSchema';
import { expectString, isValid, hasErrors } from '../../common/jsonSchema';

const schemaSectionPlain: JSONSchemaFromType<SectionPlainProps> = {
  properties: { body: expectString() },
  required: []
};

export const isValidSectionPlain = (obj: AnyObject): obj is SectionPlainProps =>
  isValid(obj, schemaSectionPlain);
export const hasErrorsSectionPlain = (obj: AnyObject) => hasErrors(obj, schemaSectionPlain);
