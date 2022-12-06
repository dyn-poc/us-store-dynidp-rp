import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import {splitVendorChunkPlugin} from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), Pages({
        dirs: 'src/pages',
    })],
    build: {
        rollupOptions: {
            output:{minifyInternalExports:true, compact:true},
            manualChunks: {
                lodash: ['lodash']
            }
        }
    }
})
