import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],

    // ======================================
    // CONFIGURATION POUR NGROK + CORS
    // ======================================
    server: {
        host: '0.0.0.0', // Écouter sur toutes les interfaces (pas seulement localhost)
        port: 5173,
        strictPort: true, // Ne pas changer de port automatiquement
        hmr: {
            host: 'localhost', // Pour le Hot Module Replacement
        },
        // IMPORTANT : Autoriser les CORS
        cors: true,
        // Autoriser l'accès depuis n'importe quelle origine (dev seulement)
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },

    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});