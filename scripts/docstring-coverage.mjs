#!/usr/bin/env bun
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

const root = process.cwd();
const configPath = join(root, "docstring-coverage.config.json");
const config = existsSync(configPath)
  ? JSON.parse(readFileSync(configPath, "utf8"))
  : {
      include: ["lib/**/*.ts", "components/**/*.tsx", "app/**/*.tsx"],
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.d.ts"],
      threshold: 100,
    };

const files = ts.sys
  .readDirectory(
    root,
    [".ts", ".tsx"],
    config.exclude ?? [],
    config.include ?? ["**/*.ts", "**/*.tsx"],
  )
  .filter((file) => !file.includes("/node_modules/") && !file.includes("/.next/"));

const rows = [];

for (const file of files) {
  const sourceText = readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);
  const scanner = createScanner(sourceFile, sourceText);
  ts.forEachChild(sourceFile, scanner);
}

const covered = rows.filter((row) => row.hasDoc).length;
const total = rows.length;
const coverage = total === 0 ? 100 : (covered / total) * 100;
const threshold = Number(config.threshold ?? 100);
const uncovered = rows.filter((row) => !row.hasDoc);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ total, covered, coverage, uncovered }, null, 2));
} else {
  console.log(`Docstring coverage: ${coverage.toFixed(1)}% (${covered}/${total})`);
  for (const row of uncovered) {
    console.log(`- ${row.file}:${row.line} ${row.name}`);
  }
}

if (coverage < threshold) {
  process.exitCode = 1;
}

function createScanner(sourceFile, sourceText) {
  return function scan(node) {
    if (isDocumentableExport(node) && !isExcludedName(node)) {
      rows.push({
        file: relative(root, sourceFile.fileName),
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
        name: getExportName(node),
        hasDoc: hasJsDoc(node, sourceText),
      });
    }
    ts.forEachChild(node, scan);
  };
}

function isDocumentableExport(node) {
  if (!hasExportModifier(node)) return false;
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isClassDeclaration(node) ||
    ts.isInterfaceDeclaration(node) ||
    ts.isTypeAliasDeclaration(node) ||
    ts.isEnumDeclaration(node) ||
    ts.isVariableStatement(node)
  );
}

function hasExportModifier(node) {
  return Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
}

function isExcludedName(node) {
  const name = getExportName(node);
  return (config.excludeNames ?? []).some((pattern) => matchesPattern(name, pattern));
}

function getExportName(node) {
  if (ts.isVariableStatement(node)) {
    return node.declarationList.declarations
      .map((declaration) => declaration.name.getText())
      .join(", ");
  }
  if (node.name) return node.name.getText();
  return "default";
}

function hasJsDoc(node, sourceText) {
  const ranges = ts.getLeadingCommentRanges(sourceText, node.getFullStart()) ?? [];
  return ranges.some((range) => sourceText.slice(range.pos, range.end).startsWith("/**"));
}

function matchesPattern(value, pattern) {
  if (pattern === value) return true;
  if (!pattern.includes("*")) return false;
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replaceAll("*", ".*");
  return new RegExp(`^${escaped}$`).test(value);
}
