<!--
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-15 12:19:00
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-15 12:55:00
 * @FilePath: /finalVirtualList/package/demo/src/components/header.vue
 * @Description: 
-->
<template>
  <div class="header">
    <router-link to="/fixedVirtualList">
      fixedVirtualList
    </router-link>
    <router-link to="/dynamicVirtualList">
      dynamicVirtualList
    </router-link>
  </div>
</template>
<style scoped lang="less">
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(46, 208, 154);
  a {
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
