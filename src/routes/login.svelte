<script lang="ts">
  import type { ConnectedUser, JsonOutput } from '$lib/server';
  import { TextField, Button, ErrorSpan, storage, stringToHashSalt } from '$lib/client';
  import { onMount } from 'svelte';

  let usernameValue = '';
  let usernameError = '';
  let passwordValue = '';
  let passwordError = '';
  let loginError = '';

  const onSubmit = async () => {
    if (!usernameValue) {
      usernameError = 'Veuillez écrire un email ou un identifiant';
    }
    if (!passwordValue) {
      passwordError = 'Veuillez remplir le mot de passe';
    }
    if (usernameValue && passwordValue) {
      const userAuthReq = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: usernameValue, password: stringToHashSalt(passwordValue) })
      });
      if (userAuthReq.ok) {
        const userAuth = (await userAuthReq.json()) as JsonOutput<ConnectedUser>;
        storage.set({ userAuth: JSON.stringify(userAuth) });
        location.href = '/';
      } else {
        loginError = "L'identifiant et le mot de passe ne correspondent pas";
      }
    }
  };

  const onInput = () => {
    loginError = '';
  };

  onMount(async () => {
    console.log('test');
    const userAuthReq = await fetch('/api/auth/login');
    if (userAuthReq.ok) {
      const userAuth = await userAuthReq.json();
      if (userAuth.token) {
        storage.set({ userAuth: JSON.stringify(userAuth) });
      } else {
        storage.set({ userAuth: undefined });
      }
    }
  });
</script>

<form on:submit="{onSubmit}">
  <h2>Connexion</h2>
  <TextField
    label="Utilisateur (email ou identifiant)"
    name="username"
    type="text"
    placeholder=""
    error="{usernameError}"
    bind:value="{usernameValue}"
    on:enter="{onSubmit}"
    on:input="{onInput}" />
  <TextField
    label="Mot de passe"
    name="password"
    type="password"
    placeholder=""
    error="{passwordError}"
    bind:value="{passwordValue}"
    on:enter="{onSubmit}"
    on:input="{onInput}" />
  <Button on:click="{onSubmit}">Login</Button>
  <ErrorSpan error="{loginError}" />
</form>

<style>
  form {
    width: 16rem;
  }
</style>
