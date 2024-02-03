import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
  props: {
    name: 'from Svelte',
  },
});

export default app;