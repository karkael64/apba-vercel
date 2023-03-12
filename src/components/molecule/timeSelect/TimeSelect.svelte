<script lang="ts">
  import { throttle } from '$lib/client';
  import { createEventDispatcher, onMount } from 'svelte';

  export let anchorDate: Date;

  const dispatch = createEventDispatcher();

  const hoursList = Array.from<undefined>({ length: 24 });
  const minutesList = Array.from<undefined>({ length: 60 });
  const secondsList = Array.from<undefined>({ length: 60 });

  const makeHandleHour = (hour: number) => () => {
    const dt = new Date(anchorDate);
    dt.setHours(hour);
    anchorDate = dt;
    dispatch('click', dt);
  };

  const makeHandleMinute = (minute: number) => () => {
    const dt = new Date(anchorDate);
    dt.setMinutes(minute);
    anchorDate = dt;
    dispatch('click', dt);
  };

  const makeHandleSecond = (second: number) => () => {
    const dt = new Date(anchorDate);
    dt.setSeconds(second);
    anchorDate = dt;
    dispatch('click', dt);
  };

  const handleScroll = (ev: Event) => {
    const scroll = ev.target as HTMLDivElement;
    const item = Array.from(scroll.children).find(
      (child) =>
        child instanceof HTMLSpanElement &&
        child.offsetTop + child.clientHeight - scroll.clientHeight / 2 > scroll.scrollTop
    ) as undefined | HTMLSpanElement;
    if (item) {
      scroll.scrollTo({
        top: item.offsetTop - (scroll.clientHeight - item.clientHeight) / 2,
        behavior: 'smooth'
      });
    }
    return item;
  };

  const handleScrollHour = throttle((ev: Event) => {
    const item = handleScroll(ev);
    if (item?.textContent) {
      const hour = parseInt(item.textContent);
      if (isFinite(hour)) {
        const dt = new Date(anchorDate);
        dt.setHours(hour);
        anchorDate = dt;
        dispatch('changeAnchorDate', dt);
      }
    }
  }, 1000);

  const handleScrollMinute = throttle((ev: Event) => {
    const item = handleScroll(ev);
    if (item?.textContent) {
      const minute = parseInt(item.textContent);
      if (isFinite(minute)) {
        const dt = new Date(anchorDate);
        dt.setMinutes(minute);
        anchorDate = dt;
        dispatch('changeAnchorDate', dt);
      }
    }
  }, 1000);

  const handleScrollSecond = throttle((ev: Event) => {
    const item = handleScroll(ev);
    if (item?.textContent) {
      const second = parseInt(item.textContent);
      if (isFinite(second)) {
        const dt = new Date(anchorDate);
        dt.setSeconds(second);
        anchorDate = dt;
        dispatch('changeAnchorDate', dt);
      }
    }
  }, 1000);

  const handleClick = () => {
    dispatch('click', anchorDate);
  };

  let hourScroll: HTMLDivElement;
  let minuteScroll: HTMLDivElement;
  let secondScroll: HTMLDivElement;

  onMount(() => {
    const hourItem = Array.prototype.find.call(
      hourScroll.children,
      (child: Element) => parseInt(child.textContent!) === anchorDate.getHours()
    );
    hourScroll.scrollTo({
      top: hourItem.offsetTop - (hourScroll.clientHeight - hourItem.clientHeight) / 2
    });

    const minuteItem = Array.prototype.find.call(
      minuteScroll.children,
      (child: Element) => parseInt(child.textContent!) === anchorDate.getMinutes()
    );
    minuteScroll.scrollTo({
      top: minuteItem.offsetTop - (minuteScroll.clientHeight - minuteItem.clientHeight) / 2
    });

    const secondItem = Array.prototype.find.call(
      secondScroll.children,
      (child: Element) => parseInt(child.textContent!) === anchorDate.getSeconds()
    );
    secondScroll.scrollTo({
      top: secondItem.offsetTop - (secondScroll.clientHeight - secondItem.clientHeight) / 2
    });
  });
</script>

<div class="time-select">
  <div class="scroll" bind:this="{hourScroll}" on:scroll="{handleScrollHour}">
    {#each hoursList as _, hour}
      <span on:click="{makeHandleHour(hour)}">{hour.toString().padStart(2, '0')}</span>
    {/each}
  </div>
  <div class="adornment">:</div>
  <div class="scroll" bind:this="{minuteScroll}" on:scroll="{handleScrollMinute}">
    {#each minutesList as _, minute}
      <span on:click="{makeHandleMinute(minute)}">{minute.toString().padStart(2, '0')}</span>
    {/each}
  </div>
  <div class="adornment">:</div>
  <div class="scroll" bind:this="{secondScroll}" on:scroll="{handleScrollSecond}">
    {#each secondsList as _, second}
      <span on:click="{makeHandleSecond(second)}">{second.toString().padStart(2, '0')}</span>
    {/each}
  </div>
  <div class="molette"></div>
  <div class="cursor"></div>
</div>

<style>
  .time-select {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20em;
    height: 10em;
    user-select: none;
    font-size: 1rem;
  }

  .adornment {
    font-weight: bold;
  }

  .scroll {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 4rem;
    max-height: 100%;
    overflow: clip scroll;
  }

  .scroll > span:first-child {
    margin-top: calc(100% + 0.5rem);
  }

  .scroll > span:last-child {
    margin-bottom: calc(100% + 0.5rem);
  }

  .molette {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    user-select: none;
    pointer-events: none;
    box-shadow: inset 0 0 1rem 1rem var(--negative);
  }

  .cursor {
    position: absolute;
    top: calc(50% - 1.25rem / 2);
    left: 1rem;
    right: 1rem;
    bottom: calc(50% - 1.25rem / 2);
    user-select: none;
    pointer-events: none;
    border: 1px solid var(--minus);
    border-radius: 2px;
  }
</style>
