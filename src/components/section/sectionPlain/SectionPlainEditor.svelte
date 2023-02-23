<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { EditorModal, MarkdownEditor } from '../../editor';
  import type { SectionPlainProps } from './SectionPlain.svelte';

  export let body = '';
  let open = false;

  const dispatch = createEventDispatcher();

  const onSave = () => {
    const data: SectionPlainProps = { body };
    dispatch('save', JSON.stringify(data));
  };
</script>

<EditorModal title="Modifier une SectionPlain" bind:open on:save="{onSave}" inner>
  <MarkdownEditor bind:markdown="{body}" />
</EditorModal>
