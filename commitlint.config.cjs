/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-09 18:16:22
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-09 19:36:24
 * @FilePath: /finalVirtualList/commitlint.config.cjs
 * @Description:
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-case": [2, "always", ["lower-case"]],
    "type-enum": [
      2,
      "always",
      [
        "feat", //新功能（feature）
        "fix", //修补bug
        "doc", //文档（documentation）
        "build", //影响构建系统或外部依赖项的更改(maven,gradle,npm 等等)
        "chore", //对非 src 和 test 目录的修改
        "perf", //性能 (提高代码性能的改变)
        "refactor", //重构
        "style", // 格式（不影响代码运行的变动,空格,格式化,等等）
        "test", //增加测试或者修改测试
        "revert", //Revert a commit
        "config", //配置
      ],
    ],
  },
};
