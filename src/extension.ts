import * as vscode from "vscode";
import * as fs from "fs";
import path from "path";
import prolog from "@qzda/prolog";

const mapping = new Map<string, any>();

function loadMappingFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    try {
      const text = fs.readFileSync(filePath, "utf8");
      const _mapping: Record<string, any> = JSON.parse(text);
      Object.entries(_mapping).forEach(([key, value]) => {
        mapping.set(key, value);
      });
      vscode.window.showInformationMessage("Mapping file loaded");
    } catch (error) {
      vscode.window.showErrorMessage(`Error loading mapping file: ${error}`);
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!workspaceFolder) {
    return;
  }

  let mappingFilePath = path.join(
    workspaceFolder,
    vscode.workspace.getConfiguration("mapping-name").get<string>("jsonPath") ||
      "./mapping-name.json"
  );

  loadMappingFile(mappingFilePath);

  // 监听映射文件变化
  vscode.workspace.onDidChangeTextDocument((event) => {
    if (event.document.uri.fsPath === mappingFilePath) {
      loadMappingFile(mappingFilePath);
    }
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("mapping-name.reload-mapping", () => {
      mappingFilePath = path.join(
        workspaceFolder,
        vscode.workspace
          .getConfiguration("mapping-name")
          .get<string>("jsonPath") || "./mapping-name.json"
      );

      loadMappingFile(mappingFilePath);
    })
  );

  // 注册 HoverProvider
  const hoverProvider = vscode.languages.registerHoverProvider("*", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      const mappingValue = mapping.get(word);
      return mappingValue
        ? new vscode.Hover(`Mapping to: **${mappingValue}**`)
        : null;
    },
  });
  context.subscriptions.push(hoverProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {
  mapping.clear();
}
