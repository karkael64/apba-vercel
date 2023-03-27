import fs from 'fs/promises';
import path from 'path';
import { isString, type AnyObject } from '../common';

export type CacheHandler = {
  filePath: string;
  write: (input: unknown) => Promise<void>;
  read: () => Promise<unknown | null>;
  remove: () => Promise<void>;
};

const propsToChunkPath = (
  outputType: string,
  fields: readonly string[],
  props: AnyObject<string, string>
) =>
  fields.reduce(
    (acc, field) => {
      if (isString(field) && field.length) {
        if (field in props && isString(props[field]) && props[field].length) {
          acc.push(encodeURIComponent(field));
          acc.push(encodeURIComponent(props[field]));
        } else {
          throw new Error(`Field ${field} is not defined props`);
        }
      }
      return acc;
    },
    ['outputType', encodeURIComponent(outputType)]
  );

const fileExists = async (filePath: string) => {
  try {
    return (await fs.lstat(filePath)).isFile();
  } catch {
    return false;
  }
};
const directoryExists = async (filePath: string) => {
  try {
    return (await fs.lstat(filePath)).isDirectory();
  } catch {
    return false;
  }
};

export const makeCache = <F extends string>(
  outputType: string,
  fields: readonly F[],
  props: AnyObject<F, string>
): CacheHandler => {
  const filePath = path.resolve(
    'node_modules',
    '.cache',
    ...propsToChunkPath(outputType, fields, props),
    'index.json'
  );
  const dirPath = path.dirname(filePath);

  const write = async (input: unknown) => {
    if (!(await directoryExists(dirPath))) {
      await fs.mkdir(dirPath, { recursive: true });
    }
    const file = await fs.open(filePath, 'w');
    await file.appendFile(JSON.stringify(input));
    await file.close();
  };

  const read = async () => {
    try {
      if (await fileExists(filePath)) {
        const file = await fs.open(filePath, 'r');
        const content = await file.readFile();
        await file.close();
        return JSON.parse(content.toString());
      }
    } catch {
      // do nothing
    }
    return null;
  };

  const remove = async () => {
    await fs.rm(path.dirname(dirPath), { recursive: true, force: true });
  };

  return { filePath, write, read, remove };
};
