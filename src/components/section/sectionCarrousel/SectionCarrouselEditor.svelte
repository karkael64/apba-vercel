<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button } from '../../atoms';
  import { EditorModal, PictureEditor } from '../../editor';
  import type { CarrouselPicture, SectionCarrouselProps } from './SectionCarrousel.svelte';

  export let pictures: CarrouselPicture[];
  export let duration: number | undefined;
  export let height: string | undefined;
  let open = false;

  const dispatch = createEventDispatcher();

  const onSave = () => {
    const data: SectionCarrouselProps = { pictures, duration, height };
    dispatch('save', JSON.stringify(data));
  };

  const onAdd = () => {
    pictures = [...pictures, { alt: '', src: '' }];
  };

  const onRemove = (index: number) => () => {
    const newList = pictures.slice();
    newList.splice(index, 1);
    pictures = newList;
  };
</script>

<EditorModal title="Modifier une SectionCarrousel" bind:open on:save="{onSave}" inner>
  {#each pictures as { src, alt }, index}
    <div class="picture">
      <PictureEditor bind:url="{src}" bind:alt />
      <Button on:click="{onRemove(index)}">Remove</Button>
    </div>
  {/each}
  <Button color="primary" on:click="{onAdd}">Add</Button>
</EditorModal>

<style>
  div.picture {
    padding: 1rem;
    border: 1px solid var(--medium);
    border-radius: 0.25rem;
    margin-bottom: 2rem;
  }
</style>
