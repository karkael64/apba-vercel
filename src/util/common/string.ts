import type { AnyObject, Truthy } from './ambient';

export const isString = (el: unknown): el is string => typeof el === 'string';

export const camelToKebab = (field: string) =>
  field.replace(/[A-Z]/g, (sub) => `-${sub.toLowerCase()}`);

const MAX_SAFE_HEXA = Number.MAX_SAFE_INTEGER.toString(16);
const MAX_SAFE_HEXA_NUMBER = MAX_SAFE_HEXA.startsWith('f')
  ? Number.MAX_SAFE_INTEGER
  : Math.pow(16, MAX_SAFE_HEXA.length - 1) - 1;

const generateHashRaw = () => Math.trunc(MAX_SAFE_HEXA_NUMBER * Math.random()).toString(16);

export const generateHash = (length = 32) => {
  let sum = generateHashRaw();
  while (sum.length < length) sum += generateHashRaw();
  return sum.substring(0, length);
};

export const stringToHash = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
};

export const stringToBinary = (text: string) => {
  const codeUnits = Uint16Array.from({ length: text.length }, (_, index) => text.charCodeAt(index));
  const charCodes = new Uint8Array(codeUnits.buffer);
  return String.fromCharCode(...Object.values(charCodes));
};

export const stringFromBinary = (binary: string) => {
  const bytes = Uint8Array.from({ length: binary.length }, (_, index) => binary.charCodeAt(index));
  const charCodes = new Uint16Array(bytes.buffer);
  return String.fromCharCode(...Object.values(charCodes));
};

const UUID_REGEXP =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})|(?:[0-9a-f]{12}[1-5][0-9a-f]{3}[89ab][0-9a-f]{15})$/i;
export const isUuid = (uuid: string) => UUID_REGEXP.test(uuid);

const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmail = (email: string) => EMAIL_REGEXP.test(email);

const URI_REGEXP = /^https?:\/\/([a-z0-9-]+\.)+[a-z]+/i;
export const isUri = (uri: string) => URI_REGEXP.test(uri);

const PHONE_REGEXP = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
export const isPhone = (phone: string) => PHONE_REGEXP.test(phone);

export const isDate = (date: unknown): date is Truthy<string | number | Date> =>
  !!date && Number.isFinite(new Date(date as string).valueOf());

export const isJsonString = (text: string) => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

export const cookieParse = (cookieText: string) =>
  cookieText.split(';').reduce((acc, assign) => {
    const [key, ...others] = assign.split('=');
    if (key) {
      const value = others.join('=');
      acc[decodeURIComponent(key.trim())] = value.length ? decodeURIComponent(value) : true;
    }
    return acc;
  }, {} as AnyObject<string, string | boolean>);

export const cookieSerialize = (cookies: AnyObject<string, number | string | boolean>) =>
  Object.entries(cookies)
    .map(([key, value]) =>
      value === true
        ? encodeURIComponent(key)
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('; ');

export const generateUUID = (version = Math.trunc(Math.random() * 6)) => {
  const key = Math.trunc(8 + Math.random() * 4).toString(16);
  return `${generateHash(8)}-${generateHash(4)}-${version}${generateHash(3)}-${key}${generateHash(
    3
  )}-${generateHash(12)}`;
};

export const tryParseJson = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    // do nothing
  }
  return text;
};
