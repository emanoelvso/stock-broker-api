module.exports = {
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
  globalSetup: './jest.global.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
