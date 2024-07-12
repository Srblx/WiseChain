import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.test.tsx',
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.api.js',
    '**/__tests__/**/*.test.api.ts',
  ],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

const adjustConfig = async (): Promise<Config> => {
  const config = await createJestConfig(customJestConfig)();

  if (process.env.TEST_ENV === 'api') {
    config.testEnvironment = 'node';
    config.testMatch = [
      '**/__tests__/**/*.test.api.js',
      '**/__tests__/**/*.test.api.ts',
    ];
  } else {
    config.testEnvironment = 'jest-environment-jsdom';
    config.testMatch = [
      '**/__tests__/**/*.test.tsx',
      '**/__tests__/**/*.test.ts',
    ];
  }

  return config;
};

export default adjustConfig;
