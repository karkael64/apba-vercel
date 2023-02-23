<script lang="ts">
  import { TextField } from '../../atoms';

  export let url: string;
  export let alt: string;
</script>

<div class="frame">
  <div class="fit">
    <TextField name="url" type="url" label="URL de l'image" bind:value="{url}" />
    <TextField name="alt" type="text" label="Texte de remplacement" bind:value="{alt}" />
  </div>
  <img src="{url}" alt="{alt}" />
</div>

<style>
  .frame {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    border: 1px solid var(--medium);
    border-radius: 0.25rem;
    padding: 1rem;
    margin: 1rem 0;
  }
  .fit {
    flex: 0 0 50%;
  }
  img {
    height: 10rem;
    max-width: 50%;
    padding: 0 1rem;
  }
</style>
