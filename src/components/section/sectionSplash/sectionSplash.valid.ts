import type { ButtonProps } from '../../atoms';
import type { SectionSplashProps } from './SectionSplash.svelte';
import {
  expectBetween,
  expectString,
  isValid,
  hasErrors,
  type JSONSchemaFromType,
  type AnyObject
} from '../../../util/common';
import type { PictureEditorProps } from '../../editor';

const schemaButton: JSONSchemaFromType<ButtonProps> = {
  properties: {
    color: expectBetween(['primary', 'secondary']),
    href: expectString(),
    text: expectString()
  },
  required: []
};

const schemaImage: JSONSchemaFromType<PictureEditorProps> = {
  properties: {
    url: expectString(),
    alt: expectString()
  },
  required: ['url', 'alt']
};

const schemaSectionSplash: JSONSchemaFromType<SectionSplashProps> = {
  properties: {
    backgroundImages: { type: 'array', items: schemaImage },
    buttonList: { type: 'array', items: schemaButton },
    body: expectString(),
    height: expectString(),
    variant: expectBetween(['left', 'right'])
  },
  required: ['buttonList', 'backgroundImages']
};

export const isValidSectionSplash = (obj: AnyObject): obj is SectionSplashProps =>
  isValid(obj, schemaSectionSplash);
export const hasErrorsSectionSplash = (obj: AnyObject) => hasErrors(obj, schemaSectionSplash);
