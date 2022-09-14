<script lang="ts">
export let src: string;
export let alt: string;
export let width: string = 'auto';
export let height: string = 'auto';
export let transitionDuration: number = 0.6;
export let filter: string | number | undefined = undefined;

import IntersectionObserver from '../../layout/intersectionObserver/IntersectionObserver.svelte';
import Image from '../../atoms/image/Image.svelte';
</script>

<IntersectionObserver once="{true}" width="{width}" height="{height}" let:intersecting>
  {#if intersecting}
    <Image alt="{alt}" src="{src}" transitionDuration="{transitionDuration}" filter="{filter}" />
  {/if}
</IntersectionObserver>
