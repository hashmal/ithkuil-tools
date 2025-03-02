module.exports = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^ipa/(.*)$': '<rootDir>/src/ipa/$1',
    '^syllables/(.*)$': '<rootDir>/src/syllables/$1',
  },
}
