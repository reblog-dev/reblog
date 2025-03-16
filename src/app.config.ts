import { program } from "commander";
import { readYamlFile } from "./utils/yaml.util";
import { existsSync } from "node:fs";
import { logger } from "./utils/logger.utils";

export interface Argv {
  config: string;
}

export interface AppConfig {
  server: {
    host: string;
    port: string;
  };
  mongo: {
    srv: boolean;
    dbName: string;
    host: string;
    port: string;
    username: string;
    password: string;
    authSource: string;
    connectionString?: string;
  };
}

const commander = program.option(
  "-c, --config <config>",
  "配置文件路径",
  "reblog.yml",
);

commander.parse();

const argv: Argv = commander.opts();

const configFilePath = argv.config;

const configFileExists = existsSync(configFilePath);

if (!configFileExists) {
  logger.error(`配置文件不存在：${configFilePath}`);
}

const rawConfig = readYamlFile<AppConfig>(configFilePath);

export const appConfig: AppConfig = {
  server: {
    host: rawConfig.server.host || "0.0.0.0",
    port: rawConfig.server.port || "5110",
  },
  mongo: {
    srv: rawConfig.mongo.srv || false,
    dbName: rawConfig.mongo.dbName || "reblog",
    host: rawConfig.mongo.host || "127.0.0.1",
    port: rawConfig.mongo.port || "27017",
    username: rawConfig.mongo.username || "reblog",
    password: rawConfig.mongo.password || "reblog",
    authSource: rawConfig.mongo.authSource || "admin",
    connectionString: rawConfig.mongo.connectionString,
  },
};
