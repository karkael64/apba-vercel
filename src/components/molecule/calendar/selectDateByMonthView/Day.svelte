<script lang="ts">
export let pin: boolean = false;
export let number: number;
export let weak: boolean = false;
</script>

<div class="{`day ${pin ? '' : 'hidePin'} ${weak ? 'weak' : ''}`}" on:click>
  <span class="number">{number}</span>
  <span class="pin"></span>
</div>

<style>
.day {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  border: 1px solid var(--primary);
  border-radius: 2px;
  cursor: pointer;
}

.day.hidePin {
  border-color: var(--minus);
}

.day.hidePin .pin {
  opacity: 0;
}

.pin {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background: var(--primary);
}

.number {
  display: inline-block;
  width: 1.5em;
  height: 1.2em;
  text-align: center;
}

.weak {
  opacity: 0.4;
}
</style>
