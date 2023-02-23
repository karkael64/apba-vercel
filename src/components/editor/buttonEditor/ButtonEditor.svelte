<script lang="ts">
  import { TextField, Button } from '../../atoms';

  export let href: undefined | string = '';
  export let text: undefined | string = '';
  export let color: undefined | 'primary' | 'secondary' = 'secondary';
</script>

<div class="frame">
  <div class="fit">
    <TextField name="href" type="url" label="URL du bouton" bind:value="{href}" />
    <TextField name="text" type="text" label="Texte du bouton" bind:value="{text}" />
    <TextField name="color" type="url" label="Couleur du bouton" bind:value="{color}" />
  </div>
  <Button href="{href}" color="{color}">{text}</Button>
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
    margin-right: 1rem;
  }
</style>
