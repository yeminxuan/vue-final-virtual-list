/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-09 17:38:29
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-11 17:25:38
 * @FilePath: /finalVirtualList/package/final-vue-virtual-list/vite.config.ts
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default () => {
  return defineConfig({
    plugins: [vue()],
  });
};
