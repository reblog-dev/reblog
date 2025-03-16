import { load } from "js-yaml";
import { readFileSync } from "node:fs";

export function readYamlFile<T>(filePath: string) {
  const yamlFileContent = readFileSync(filePath, "utf8")

  return load(yamlFileContent) as T
}
