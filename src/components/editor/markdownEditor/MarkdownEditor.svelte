<script lang="ts">
  import { TextArea } from '../../atoms';
  import { Markdown } from '../../molecule';

  export let markdown = '';
</script>

<div class="frame">
  <TextArea label="Text au format Markdown" bind:value="{markdown}" />
  <div>
    <span class="label">Résultat attendu</span>
    <div class="mardown">
      <Markdown content="{markdown}" />
    </div>
  </div>
</div>

<style>
  .frame {
    display: block;
    padding: 1rem;
    margin: 1rem 0;
    border: none;
    outline: 1px solid var(--medium);
    border-radius: 0.25rem;
  }
  .mardown {
    display: block;
    padding: 1rem;
    border: none;
    outline: 1px solid var(--medium);
    border-radius: 0.25rem;
    margin: 0.25rem 0;
  }
  .label {
    color: var(--medium);
    font-size: 0.875rem;
  }
</style>
