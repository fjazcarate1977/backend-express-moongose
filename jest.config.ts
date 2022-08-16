import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '^.+.test.ts$',
  verbose: true,
  detectOpenHandles: true,
  silent: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  })
};
export default config;
