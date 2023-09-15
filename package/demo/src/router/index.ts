/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-11 16:21:24
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-15 12:21:38
 * @FilePath: /finalVirtualList/package/demo/src/router/index.ts
 * @Description:
 */
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const routeRecordList: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/home.vue"),
  },
  {
    path: "/fixedVirtualList",
    component: () => import("@/views/fixedVirtualList.vue"),
  },
  {
    path: "/dynamicVirtualList",
    component: () => import("@/views/dynamicVirtualList.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routeRecordList,
});
export default router;
