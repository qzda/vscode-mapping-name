# Mapping Name

[English](./README.md) | [中文](./README-zh.md)

Mapping Name 是一个 Visual Studio Code 扩展，将代码中的变量名映射到 JSON 文件，当鼠标悬停在代码中的变量上时显示其对应的可读名称。让你写出更加难读懂的忍者代码。

## 功能特点

- 支持所有文本文件
- 实时监听映射文件变化，自动更新

## 安装

[https://marketplace.visualstudio.com/items?itemName=qzda.mapping-name](https://marketplace.visualstudio.com/items?itemName=qzda.mapping-name)

## 使用方法

在项目根目录创建 `mapping-name.json` 文件，并添加以下内容：

```json
{
  "n": "name",
  "u": "user",
  "pwd": "password"
}
```

在代码编辑器中，当鼠标悬停在变量 `n` 时，会显示 `name`。
