import { readable, writable } from 'svelte/store';
import { isObject, isString, tryParseJson, type AnyObject } from '../common';
import type { ConnectedUser, JsonOutput } from '../server';

type Storage = { userAuth?: string; 'color-scheme'?: string };

const readLocalStorage = () =>
  Object.keys(window.localStorage).reduce((acc, key) => {
    const json = window.localStorage.getItem(key);
    if (json) {
      acc[key] = json;
    }
    return acc;
  }, {} as AnyObject);

const writeLocalStorage = (newValue: AnyObject<string, string>) =>
  Object.entries(newValue).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  });

export const storage = writable<JsonOutput<Storage>>();

storage.subscribe((value) => {
  if (isObject(value)) {
    writeLocalStorage(value);
  }
});

let storageInitiated = false;

export const initStorage = (): Storage => {
  const initData = readLocalStorage();
  if (!storageInitiated) {
    storageInitiated = true;
    storage.set(initData);
  }
  return initData;
};

const init = Symbol('init');

export const makeStorage = (key: keyof Storage) => {
  const customStorage = writable<undefined | string | symbol>(init);
  storage.subscribe((value) => {
    if (isObject(value) && key in value) customStorage.set(value[key] as string);
  });
  customStorage.subscribe((value) => {
    if (isString(value)) storage.set({ [key]: value });
  });
  return customStorage;
};

export const userAuthStorage = makeStorage('userAuth');
export const groupStorage = readable('', (set) => {
  userAuthStorage.subscribe((userAuthJson) => {
    if (isString(userAuthJson)) {
      const userAuth = tryParseJson(userAuthJson) as null | ConnectedUser;
      const group = userAuth?.user.level.name;
      if (isString(group)) {
        set(group);
      }
    }
  });
});
