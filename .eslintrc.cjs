/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-09 18:17:56
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-09 19:29:48
 * @FilePath: /finalVirtualList/.eslintrc.cjs
 * @Description: 
 */
module.exports =  {
    "root": true,
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": [
      'plugin:@typescript-eslint/recommended', //使用typescript推荐配置
      'plugin:vue/vue3-recommended',
    ],
    "parser": 'vue-eslint-parser',
    "parserOptions": {
      "parser": '@typescript-eslint/parser',
      "ecmaVersion": 2022,
      "sourceType": 'module',
    },
    "plugins": ['@typescript-eslint'],
    "rules": {
      //eslint rules config
      "semi": ['error', 'always'],
      "indent": ['error', 2],
      "linebreak-style": ["error", "unix"],
      //typescriptes rules config
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/no-non-null-assertion': 0, //允许使用!断言
      '@typescript-eslint/no-explicit-any': 0, //允许使用any
      '@typescript-eslint/no-unused-vars': 0, //允许未使用的变量
      "@typescript-eslint/no-empty-function": 0,//允许函数内容为空
      "@typescript-eslint/no-loss-of-precision": 0,//允许计算时出现丢失精度的情况
      "@typescript-eslint/ban-types": 0,//此规则禁止特定类型，并可以建议替代方案。请注意，它不会禁止使用相应的运行时对象。
      "@typescript-eslint/ban-ts-comment": 0,
      //vue3 rules config
        "vue/multi-word-component-names": ["error", {
          "ignores": []
        }],
        'vue/no-mutating-props': 0
    },
};