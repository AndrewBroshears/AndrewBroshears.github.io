import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    publicDir: 'assets',
    server: {
        watch: {
            ignored: ['**/.vs/**'],
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three'],
                    motion: ['gsap', 'gsap/ScrollTrigger'],
                },
            },
        },
    },
});
