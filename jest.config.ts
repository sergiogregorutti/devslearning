import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/tests/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "!components/**/*.d.ts",
  ],
  coverageReporters: ["text", "lcov", "json", "html"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Esto mapea el alias '@' a la raíz del proyecto
  },
};

export default createJestConfig(config);
