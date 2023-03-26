<script>
  import { todayNoon } from '$lib/client';
  import EditionModal from '../editionModal/EditionModal.svelte';
  import EventEditor from './EventEditor.svelte';

  export let open = false;

  let title = '';
  let body = '';
  let start = new Date(todayNoon);
  let end = new Date(todayNoon);

  const handleCreate = async () => {
    await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({ event: { title, body, start, end } })
    });
    open = false;
  };
</script>

<EditionModal bind:open title="Ajouter un événement" on:create="{handleCreate}" mode="create">
  <EventEditor bind:title bind:body bind:end bind:start />
</EditionModal>
