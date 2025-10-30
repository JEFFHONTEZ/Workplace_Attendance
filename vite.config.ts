import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
    plugins: (() => {
        const plugins: any[] = [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ];
        // Optionally enable Wayfinder if PHP is available; disable in CI/containers without OpenSSL 1.1
        if (process.env.ENABLE_WAYFINDER === 'true') {
            plugins.push(
                wayfinder({
                    formVariants: true,
                }),
            );
        }
        return plugins;
    })(),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    esbuild: {
        jsx: 'automatic',
    },
});
