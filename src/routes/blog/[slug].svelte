<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params: { slug }, fetch }) => {
    const req = await fetch(`/api/blogs/${slug}`);
    if (req.ok) {
      try {
        const { blog } = await req.json();
        return { props: { blog } };
      } catch (e) {
        // do nothing
      }
    }
    return { error: 'Error', status: 500 };
  };
</script>

<script lang="ts">
  import { Section, type prisma } from '$lib/client';
  export let blog: null | (prisma.Blog & { sections: prisma.BlogSection[] });

  blog?.sections.sort((a, b) => a.order - b.order);
</script>

<svelte:head>
  <title>APBA - {blog?.title}</title>
</svelte:head>

{#if blog?.sections}
  {#each blog.sections as section (section.id)}
    <Section section="{section}" />
  {/each}
{/if}
