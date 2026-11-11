import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relative : fonctionne sur GitHub Pages (/hybrid-program/) comme en local
export default defineConfig({ plugins: [react()], base: './' });
