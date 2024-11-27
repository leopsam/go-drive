/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverage: false,
    moduleDirectories: ['node_modules', 'src'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>src/tests/**/*.(test|spec).ts'],
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
}

export default config
