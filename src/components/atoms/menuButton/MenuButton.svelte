<script lang="ts">
  export let open = false;
</script>

<svg class="{`menu-button ${open ? 'open' : ''}`}" on:click viewBox="0 0 16 16">
  <rect name="top" x="2" y="2" width="12" height="2" fill="currentColor" opacity="1"></rect>
  <rect name="middle" x="2" y="7" width="12" height="2" fill="currentColor" opacity="1"></rect>
  <rect name="bottom" x="2" y="12" width="12" height="2" fill="currentColor" opacity="1"></rect>
</svg>

<style>
  svg.menu-button {
    width: 1em;
    height: 1em;
    cursor: pointer;
  }

  svg.menu-button rect {
    transform: rotate(0) translate(0, 0);
    transition: all 0.2s ease;
    opacity: 1;
  }

  svg.menu-button.open rect {
    transition: all 0.2s ease;
  }

  svg.menu-button.open rect[name='top'] {
    transform: rotate(45deg) translate(3px, -3px);
  }

  svg.menu-button.open rect[name='middle'] {
    opacity: 0;
  }

  svg.menu-button.open rect[name='bottom'] {
    transform: rotate(-45deg) translate(-8px, -2px);
  }
</style>
