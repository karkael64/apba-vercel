<script>
  import { colorScheme } from '../../provider/color/colorScheme';
  import { Button } from '../../atoms';
  const toggleColorScheme = () =>
    colorScheme.update((current) => (current === 'light' ? 'dark' : 'light'));
</script>

<Button shape="circle" color="secondary" on:click="{toggleColorScheme}"
  >{$colorScheme === 'light' ? '☀️' : '🌙'}</Button>
