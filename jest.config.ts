// import type { Config } from 'jest';
// import { pathsToModuleNameMapper } from 'ts-jest';
// import { compilerOptions } from './tsconfig.json';

// const config: Config = {
//   clearMocks: true,
//   collectCoverage: true,
//   coverageDirectory: 'coverage',
//   coverageProvider: 'v8',
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//   },
//   transformIgnorePatterns: ['<rootDir>/node_modules/'],
// };

// export default config;


import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__mocks__/"      
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};

export default createJestConfig(config);