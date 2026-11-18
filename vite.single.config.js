import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Build en un seul fichier HTML autonome (pour publier la page telle quelle)
export default defineConfig({ plugins: [react(), viteSingleFile()], build: { outDir: 'dist-single' } });
