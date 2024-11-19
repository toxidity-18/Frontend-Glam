// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default ({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': '/src/assets',
        '@css': '/src/assets/css',
        '@pages': '/src/pages',
        '@comp': '/src/components',
        '@help': '/src/helpers',
        '@imgs': '/public/images',
      },
    },
    define: {
      // Provide any global constants here if needed
    },
  });
};
