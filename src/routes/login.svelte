<script lang="ts">
  import { TextField, Button } from '$lib/client';
  import { onMount } from 'svelte';

  let usernameValue = '';
  let usernameError = '';
  let passwordValue = '';
  let passwordError = '';

  const onSubmit = async () => {
    if (!usernameValue) {
      usernameError = 'Veuillez écrire un email ou un indentifiant';
    }
    if (!passwordValue) {
      passwordError = 'Veuillez remplir le mot de passe';
    }
    if (usernameValue && passwordValue) {
      await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: usernameValue, password: passwordValue })
      });
    }
  };

  onMount(async () => {
    console.log(await (await fetch('/api/auth/login')).json());
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
    on:enter="{onSubmit}" />
  <TextField
    label="Mot de passe"
    name="password"
    type="password"
    placeholder=""
    error="{passwordError}"
    bind:value="{passwordValue}"
    on:enter="{onSubmit}" />
  <Button on:click="{onSubmit}">Login</Button>
</form>

<style>
  form {
    width: 16rem;
  }
</style>
