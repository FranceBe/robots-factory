import { resolve } from 'path'
const coverageThreshold = require('./src/tests-utils/coverage-threshold.json')

const baseDir = __dirname

module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.component.tsx',
    'src/**/*.container.tsx',
    'src/**/*.page.tsx',
    'src/**/*.service.ts',
    'src/**/*.service.tsx',
    'src/styles/*.ts',
    'src/hooks/useTimer/*.tsx',
  ],
  coverageDirectory: resolve(baseDir, 'dist', 'coverage'),
  coverageReporters: ['text', 'html'],
  coverageThreshold: {
    global: coverageThreshold,
  },
  displayName: 'template-react-typescript',
  globalSetup: resolve(baseDir, 'src', 'tests-utils', 'jest-global-setup.js'),
  globals: {
    'ts-jest': {
      tsconfig: resolve(baseDir, 'tsconfig.json'),
    },
  },
  moduleDirectories: ['./node_modules', './src'],
  moduleNameMapper: {
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$':
      resolve(baseDir, 'src', 'tests-utils', 'mocks', 'image.js'),
  },
  modulePathIgnorePatterns: [resolve(baseDir, 'dist')],
  preset: 'ts-jest/presets/js-with-babel',
  rootDir: baseDir,
  testEnvironment: 'jsdom',
}
