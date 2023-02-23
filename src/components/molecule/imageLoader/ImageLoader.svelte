<script lang="ts">
  export let src: string;
  export let alt: string;
  export let width: string | undefined = undefined;
  export let height: string | undefined = undefined;
  export let transitionDuration: number = 0.6;
  export let filter: string | number | undefined = undefined;

  import { IntersectionObserver } from '../../layout';
  import { Image } from '../../atoms';
</script>

<IntersectionObserver once="{true}" width="{width}" height="{height}" let:intersecting>
  {#if intersecting}
    <Image alt="{alt}" src="{src}" transitionDuration="{transitionDuration}" filter="{filter}" />
  {/if}
</IntersectionObserver>
