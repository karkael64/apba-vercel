import type { SectionPlainProps } from './SectionPlain.svelte';
import type { AnyObject } from '$lib/client';
import type { JSONSchemaFromType } from '$lib/client';
import { expectString, isValid, hasErrors } from '$lib/client';

const schemaSectionPlain: JSONSchemaFromType<SectionPlainProps> = {
  properties: { body: expectString() },
  required: []
};

export const isValidSectionPlain = (obj: AnyObject): obj is SectionPlainProps =>
  isValid(obj, schemaSectionPlain);
export const hasErrorsSectionPlain = (obj: AnyObject) => hasErrors(obj, schemaSectionPlain);
