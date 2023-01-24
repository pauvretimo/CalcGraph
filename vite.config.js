import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import fs from 'fs';



/** @type {import('vite').Plugin} */
const hexLoader = {
  name: 'hex-loader',
  transform(code, id) {
      const [path, query] = id.split('?');
      if (query != 'raw-hex')
          return null;

      const data = fs.readFileSync(path);
      const hex = data.toString('hex');

      return `export default '${hex}';`;
  }
};


export default defineConfig({
  plugins: [solidPlugin(), hexLoader
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
