import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relative : fonctionne sur GitHub Pages (/programme-hybride/) comme en local
export default defineConfig({ plugins: [react()], base: './' });
