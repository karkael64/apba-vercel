<script lang="ts">
  import markdown from 'markdown-it';
  const md = markdown('commonmark');
  export let content: string;
</script>

<div>
  {@html md.render(content)}
</div>
