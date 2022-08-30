<script lang="ts">
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import MenuButton from "./MenuButton.svelte";
</script>

<Meta
	title="MenuButton"
	component={MenuButton}
	argTypes={{ open: { control: { type: "boolean" } } }} />

<Template let:args>
	<MenuButton {...args} />
</Template>

<Story name="Default" />
<Story name="Open" args={{ open: true }} />
