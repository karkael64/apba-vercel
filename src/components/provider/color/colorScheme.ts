import { makeStorage } from '$lib/client';

export const colorScheme = makeStorage<'light' | 'dark' | null | undefined>('color-scheme');
