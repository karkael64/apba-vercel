import { writable } from 'svelte/store';
import { isObject, tryParseJson, type AnyObject } from '../common';
import type { JsonOutput } from '../server';

type Storage = { group?: string; expire?: Date };

const readLocalStorage = () =>
  Object.keys(window.localStorage).reduce((acc, key) => {
    const json = window.localStorage.getItem(key);
    if (json) {
      acc[key] = tryParseJson(json);
    }
    return acc;
  }, {} as AnyObject);

const writeLocalStorage = (newValue: AnyObject) =>
  Object.entries(newValue).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  });

export const storage = writable<JsonOutput<Storage>>();

storage.subscribe((value) => {
  if (isObject(value)) {
    writeLocalStorage(value);
  }
});

export const initStorage = () => {
  const initData = readLocalStorage();
  storage.set(initData);
  return initData;
};

const init = Symbol('init');

export const makeStorage = <V = unknown>(key: string) => {
  const customStorage = writable<JsonOutput<V> | symbol>(init);
  storage.subscribe((value) => {
    if (isObject(value) && key in value)
      customStorage.set(value[key as keyof Storage] as JsonOutput<V>);
  });
  customStorage.subscribe((value) => {
    if (value !== init) storage.set({ [key]: value });
  });
  return customStorage;
};

export const groupStorage = makeStorage<'admin' | 'adhérant' | ''>('group');
export const expireStorage = makeStorage<string>('expire');
