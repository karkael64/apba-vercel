<script>
  import EditionModal from '../editionModal/EditionModal.svelte';
  import EventSerieEditor from './EventSerieEditor.svelte';

  export let open = false;

  let title = '';
  let body = '';

  const handleCreate = async () => {
    await fetch(`/api/events/series`, {
      method: 'POST',
      body: JSON.stringify({ eventSerie: { title, body } })
    });
    open = false;
  };
</script>

<EditionModal bind:open title="Ajouter une activité" on:create="{handleCreate}" mode="create">
  <EventSerieEditor bind:title bind:body />
</EditionModal>
