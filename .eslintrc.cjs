/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-09 18:17:56
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-11 12:26:36
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
      "@typescript-eslint/ban-types": 0,
      "@typescript-eslint/ban-ts-comment": 0,
      //vue3 rules config
        "vue/multi-word-component-names": 0,
    },
};