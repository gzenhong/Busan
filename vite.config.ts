
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 這能確保程式碼中的 process.env.API_KEY 在瀏覽器執行時會被替換成真正的變數值
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});
