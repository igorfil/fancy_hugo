import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import terser from '@rollup/plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  // This `main.js` file we wrote
  input: 'src/main.js',
  output: {
    // The destination for our bundled JavaScript
    file: 'static/js/bundle.js',
    // Our bundle will be an Immediately-Invoked Function Expression
    format: 'iife',
    // The IIFE return value will be assigned into a variable called `app`
    name: 'app',
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
			dev: !production,
      // Tell the svelte plugin where our svelte files are located
      include: 'src/**/*.svelte',
    }),
    // Tell any third-party plugins that we're building for the browser
    resolve({ browser: true }),

    // If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
  ],
  watch: {
		clearScreen: false,
		include: 'src/**'
	}
};