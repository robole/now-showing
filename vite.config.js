import { defineConfig, loadEnv } from 'vite';
import { svelte } from "@sveltejs/vite-plugin-svelte";

/** @type {import('vite').UserConfig} */
export default ({ mode }) => defineConfig({
		plugins: [svelte()],
  	test: {
    	globals: true,
			environment: "jsdom",
			setupFiles: ["test/setuptest.js"],
  	},
	});
