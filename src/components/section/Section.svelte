<script lang="ts">
  import type { prisma, SvelteEvent } from '$lib/client';
  import SectionThumbs from './sectionThumbs/SectionThumbs.svelte';
  import SectionSplash from './sectionSplash/SectionSplash.svelte';
  import SectionPlain from './sectionPlain/SectionPlain.svelte';
  import SectionCarrousel from './sectionCarrousel/SectionCarrousel.svelte';

  export let section: prisma.BlogSection;

  const onSave = async (ev: SvelteEvent<string>) => {
    await fetch(`/api/sections/${section.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        blogSection: { model: section.model, json: ev.detail }
      })
    });
    location.reload();
  };
</script>

{#if section.model === 'SectionThumbs'}
  <SectionThumbs {...JSON.parse(section.json)} on:save="{onSave}" />
{:else if section.model === 'SectionSplash'}
  <SectionSplash {...JSON.parse(section.json)} on:save="{onSave}" />
{:else if section.model === 'SectionPlain'}
  <SectionPlain {...JSON.parse(section.json)} on:save="{onSave}" />
{:else if section.model === 'SectionCarrousel'}
  <SectionCarrousel {...JSON.parse(section.json)} on:save="{onSave}" />
{/if}
