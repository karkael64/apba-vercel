<script lang="ts" context="module">
  import type { prisma } from '$lib/server';
  import type { Load } from '@sveltejs/kit';
  type Blog = Pick<prisma.Blog, 'id' | 'authorId' | 'title' | 'slug'>;

  export const load: Load = async ({ fetch }) => {
    const resp = await fetch(`/api/blogs`);
    if (resp.ok) {
      const blogsResp = (await resp.json()) as { blogs: Blog[] };
      return { props: { blogs: blogsResp.blogs } };
    }
    return { error: 'Error', status: 500 };
  };
</script>

<script lang="ts">
  import { Button, TextField, userAuth } from '$lib/client';

  export let blogs: Blog[];
  export let createSlug = '';
  export let createTitle = '';

  const onUpdate = (id: number) => async () => {
    const found = blogs.find((blog) => blog.id === id);
    const authorId = $userAuth?.user.id;
    if (authorId && found) {
      await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ blog: { authorId, slug: found.slug, title: found.title } })
      });
    }
  };

  const onDelete = (id: number) => async () => {
    const found = blogs.find((blog) => blog.id === id);
    if (found) {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    }
  };

  const onCreate = async () => {
    const authorId = $userAuth?.user.id;
    if (authorId && createSlug && createTitle) {
      await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ blog: { authorId, slug: createSlug, title: createTitle, body: '' } })
      });
    }
  };
</script>

<div>
  <h2>Modifier des blogs existants</h2>
  {#each blogs as { id, slug, title }}
    <div class="blog">
      <TextField type="text" name="slug" label="Identifiant" bind:value="{slug}" />
      <TextField type="text" name="title" label="Titre" bind:value="{title}" />
      <Button color="primary" on:click="{onUpdate(id)}">Modifier</Button>
      <Button on:click="{onDelete(id)}">Supprimer</Button>
    </div>
  {/each}

  <h2>Créer un blog</h2>
  <div class="blog">
    <TextField type="text" name="slug" label="Identifiant" bind:value="{createSlug}" />
    <TextField type="text" name="title" label="Titre" bind:value="{createTitle}" />
    <Button color="primary" on:click="{onCreate}">Créer</Button>
  </div>
</div>

<style>
  .blog {
    padding: 1rem;
    border: 1px solid var(--medium);
    border-radius: 0.25rem;
    margin-bottom: 2rem;
  }
</style>
