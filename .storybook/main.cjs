module.exports = {
  stories: ['../src/components/**/*.stories.@(svelte)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-svelte-csf'
  ],
  framework: '@storybook/svelte',
  svelteOptions: {
    preprocess: require('svelte-preprocess')()
  }
};
