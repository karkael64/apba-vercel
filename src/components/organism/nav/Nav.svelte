<script lang="ts">
  import { cookieParse } from '$lib/client';
  import { onMount } from 'svelte';
  import { MenuButton } from '../../atoms';
  import { ImageLoader, SwitchColor } from '../../molecule';

  let open = false;

  const prevent = (ev: Event) => {
    ev.stopPropagation();
  };

  const toggleOpen = (ev: Event) => {
    prevent(ev);
    open = !open;
  };

  const close = (ev: MouseEvent) => {
    prevent(ev);
    open = false;
  };

  onMount(() => {
    console.log(cookieParse(document.cookie));
  });
</script>

<svelte:window on:click="{close}" />

<header>
  <nav on:click="{prevent}">
    <div class="fixed-head">
      <ImageLoader src="/logo/apba-ghosts.svg" width="{64}" height="{64}" alt="Icon of APBA" />
      <div class="mobile-buttons">
        <div class="color-button">
          <SwitchColor />
        </div>
        <div class="menu-button">
          <MenuButton open="{open}" on:click="{toggleOpen}" />
        </div>
      </div>
      <div class="big-list">
        <ul>
          <li>
            <a href="/">APBA - Accueil</a>
          </li>
          <li>
            <a href="/agenda">Agenda</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <ul>
          <li>
            <SwitchColor />
          </li>
          <li>
            <a href="/logout">Déconnexion</a>
          </li>
          <li>
            <a href="/login">Connexion</a>
          </li>
          <li>
            <a href="/profile">Paramètres</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="{`mobile-list ${open ? 'open' : ''}`}">
      <ul on:click="{close}">
        <li>
          <a href="/">APBA - Accueil</a>
        </li>
        <li>
          <a href="/agenda">Agenda</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/logout">Déconnexion</a>
        </li>
        <li>
          <a href="/login">Connexion</a>
        </li>
        <li>
          <a href="/profile">Paramètres</a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<style>
  header {
    height: 80px;
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    color: white;
    font-weight: 600;
  }

  a,
  a:active,
  a:focus,
  a:focus-visible,
  a:visited {
    display: inline-block;
  }

  .fixed-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background: var(--sinopia);
  }

  .mobile-buttons {
    font-size: 2rem;
    height: 1em;
    line-height: 0.5em;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .mobile-list > ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .mobile-list > ul > li {
    margin: 0 2em;
    border-bottom: 1px solid var(--primary);
  }

  .mobile-list > ul > li > a {
    width: auto;
    padding: 1em;
  }

  .mobile-buttons > .color-button {
    margin: 0 0.5em 0 0;
  }

  .mobile-buttons > .menu-button {
    margin: 0 1em 0 0;
  }

  .mobile-list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: -1;
    background: var(--secondary);
    padding: 1em 0;
    transition: all 0.2s ease;
  }

  .mobile-list.open {
    transform: translateY(100%);
  }

  .big-list {
    display: none;
  }

  @media only screen and (min-width: 1000px) {
    .mobile-buttons {
      display: none;
    }

    .mobile-list {
      display: none;
    }

    .big-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      flex: 1 0 auto;
    }

    .big-list > ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .big-list > ul > li {
      margin: 1em;
    }
  }
</style>
