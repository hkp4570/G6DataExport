import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "./index" },
  ],
  plugins:[
    '@umijs/plugins/dist/dva',
  ],
  dva:{},
  npmClient: 'yarn',
  alias: {
    '@': '/src',
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
});
