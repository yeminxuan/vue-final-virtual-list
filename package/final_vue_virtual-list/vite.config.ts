/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-09 17:38:29
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-09 19:34:37
 * @FilePath: /finalVirtualList/package/final_vue_virtual-list/vite.config.ts
 * @Description:
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    plugins: [vue()],
  });
};
