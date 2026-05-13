import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    base: './',
    build: {
        rollupOptions: {
            output: {
                // Переименовываем файлы, начинающиеся с _
                chunkFileNames: (chunkInfo) => {
                    const name = chunkInfo.name;
                    if (name.startsWith('_')) {
                        return `assets/vendor-${name.slice(1)}.js`;
                    }
                    return `assets/[name]-[hash].js`;
                },
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
});
