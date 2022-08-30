import { SvelteComponentTyped } from 'svelte';

declare class MenuButton extends SvelteComponentTyped<{ open?: boolean }, { click: Event }> {}

export default MenuButton;
