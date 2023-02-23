<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ButtonProps } from '../../atoms';
  import { EditorModal, ButtonEditor, PictureEditor } from '../../editor';
  import type { PictureEditorProps } from '../../editor';
  import { TextField } from '../../atoms';
  import { MarkdownEditor } from '../../editor';
  import type { SectionSplashProps } from './SectionSplash.svelte';

  export let buttonList: ButtonProps[];
  export let backgroundImages: PictureEditorProps[];
  export let height = '80vh';
  export let body = '';
  export let variant: SectionSplashProps['variant'] = 'right';
  let open = false;

  const dispatch = createEventDispatcher();

  const onSave = () => {
    const data: SectionSplashProps = { buttonList, backgroundImages, body, height, variant };
    dispatch('save', JSON.stringify(data));
  };
</script>

<EditorModal bind:open title="Modifier une SectionSplash" on:save="{onSave}" inner>
  {#each backgroundImages as { url, alt }}
    <PictureEditor bind:url bind:alt />
  {/each}
  <MarkdownEditor bind:markdown="{body}" />
  {#each buttonList as { color, href, text }}
    <ButtonEditor bind:color bind:href bind:text />
  {/each}
  <hr />
  <TextField type="text" name="height" label="Hauteur" bind:value="{height}" />
  <TextField type="text" name="variant" label="Variant" bind:value="{variant}" />
</EditorModal>
