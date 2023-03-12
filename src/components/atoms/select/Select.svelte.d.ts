import type { AnyObject, SvelteEvent } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

declare class Select<K extends string, B extends boolean = false> extends SvelteComponentTyped<
  {
    formatValue?: (selectedOptions: AnyObject<string, string>) => string;
    label?: string;
    multiple?: B;
    options: AnyObject<K, string>;
    placeholder?: string;
    value?: B extends true ? K[] : K;
  },
  {
    focus: Event;
    blur: Event;
    input: SvelteEvent<B extends true ? K[] : K>;
    enter: SvelteEvent<B extends true ? K[] : K>;
  }
> {}

export default Select;
