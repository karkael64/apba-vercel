import type { AnyObject, SvelteEvent } from '$lib/server';
import { SvelteComponentTyped } from 'svelte';

export type SelectOptions<K extends string = string> = AnyObject<K, string>;

declare class Select<K extends string, B extends boolean = false> extends SvelteComponentTyped<
  {
    formatValue?: (selectedOptions: SelectOptions) => string;
    label?: string;
    multiple?: B;
    options: SelectOptions<K>;
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
