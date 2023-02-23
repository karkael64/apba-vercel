<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SectionThumbsProps, Thumb } from './SectionThumbs.svelte';
  import { EditorModal, PictureEditor, ButtonEditor, MarkdownEditor } from '../../editor';

  export let thumbs: Thumb[];
  let open = false;

  const dispatch = createEventDispatcher();

  const onSave = () => {
    const data: SectionThumbsProps = { thumbs };
    dispatch('save', JSON.stringify(data));
  };
</script>

<EditorModal bind:open title="Modifier une SectionThumbs" on:save="{onSave}" inner>
  {#each thumbs as thumb, id}
    <h3>Section {id}</h3>
    <div>
      <PictureEditor bind:url="{thumb.pictureUrl}" bind:alt="{thumb.pictureAlt}" />
      <ButtonEditor
        bind:color="{thumb.buttonColor}"
        bind:href="{thumb.buttonHref}"
        bind:text="{thumb.buttonLabel}" />
      <MarkdownEditor bind:markdown="{thumb.body}" />
    </div>
  {/each}
</EditorModal>
