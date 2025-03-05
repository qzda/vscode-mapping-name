# Mapping Name

[English](./README.md) | [中文](./README-zh.md)

Mapping Name is a Visual Studio Code extension that maps variable names in your code to a JSON file, displaying the corresponding readable name when you hover over a variable in your code. It allows you to write more impenetrable ninja code.

## Features

- Supports all text files
- Listens in real-time for changes to the mapping file, updating automatically

## Installation

1. Open VS Code
2. Press Cmd+P / Ctrl+P to open the command palette
3. Type ext install mapping-name

## Usage

Create a `mapping-name.json` file in the root directory of your project and add the following content:

```json
{
  "n": "name",
  "u": "user",
  "pwd": "password"
}
```

In the code editor, when you hover over the `n`, it will display `name`.
