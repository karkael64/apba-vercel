import fs from 'fs/promises';
import path from 'path';
import { isString, type AnyObject } from '../common';

export type CacheHandler<R> = {
  filePath: string;
  write: (input: R) => Promise<void>;
  read: () => Promise<R | null>;
  remove: () => Promise<void>;
  exists: boolean;
  updatedAt: number;
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
    const stat = await fs.lstat(filePath);
    return { exists: stat.isFile(), updatedAt: stat.mtime.valueOf() };
  } catch {
    return { exists: false, updatedAt: 0 };
  }
};

const directoryExists = async (filePath: string) => {
  try {
    return (await fs.lstat(filePath)).isDirectory();
  } catch {
    return false;
  }
};

export const makeCache = async <F extends string, R>(
  outputType: string,
  fields: readonly F[],
  props = {} as AnyObject<F, string>
): Promise<CacheHandler<R>> => {
  const filePath = path.resolve(
    'node_modules',
    '.cache',
    ...propsToChunkPath(outputType, fields, props),
    'index.json'
  );
  const dirPath = path.dirname(filePath);
  const { exists, updatedAt } = await fileExists(filePath);

  const write = async (input: unknown) => {
    if (!exists && !(await directoryExists(dirPath))) {
      await fs.mkdir(dirPath, { recursive: true });
    }
    const file = await fs.open(filePath, 'w');
    await file.appendFile(JSON.stringify(input));
    await file.close();
    result.exists = true;
    result.updatedAt = Date.now();
  };

  const read = async () => {
    try {
      if (exists) {
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
    if (exists) {
      await fs.rm(path.dirname(dirPath), { recursive: true, force: true });
    }
  };

  const result: CacheHandler<R> = { filePath, write, read, remove, exists, updatedAt };
  return result;
};
