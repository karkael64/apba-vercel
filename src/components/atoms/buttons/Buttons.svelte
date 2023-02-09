<script lang="ts">
  export let list: { href?: string; color: string; text: string }[];
</script>

<div class="buttons">
  {#each list as { href, color = "secondary", text = "" }}
    {#if href}
      <a href="{href}" type="button" class="{`button ${color}`}">{text}</a>
    {:else}
      <button type="button" class="{`button ${color}`}" on:click>
        {text}
      </button>
    {/if}
  {/each}
</div>

<style>
  .buttons {
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    color: var(--negative);
    border-radius: 0.5em;
    overflow: hidden;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;

    padding: 0.5em 1em;
    border: 0;
    height: 2.5em;

    cursor: pointer;
    user-select: none;
    color: white;

    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;

    transition: all 0.2s;
  }

  .button:hover {
    box-shadow: inset 0 0 1.2em 0 #8882;
  }

  .primary {
    background: var(--primary);
  }

  .secondary {
    background: var(--secondary);
  }

  @media only screen and (max-width: 999px) {
    .buttons {
      flex-direction: column;
    }

    .button {
      width: auto;
    }
  }
</style>
