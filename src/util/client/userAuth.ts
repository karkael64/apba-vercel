import { writable } from 'svelte/store';
import type { ConnectedUser } from '../server';

export const userAuth = writable<ConnectedUser | null>(null);
