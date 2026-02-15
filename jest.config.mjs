/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/hooks/**/*.{ts,tsx}",
    "src/lib/**/*.ts",
    "!**/*.d.ts",
  ],
};

export default config;
