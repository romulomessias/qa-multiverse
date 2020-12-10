module.exports = {
    rootDir: '../',
    moduleFileExtensions: ['json', 'ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '^src(.*)$': '<rootDir>/src$1',
        '^test(.*)$': '<rootDir>/test$1',
        '\\.(css|sass|scss)$': '<rootDir>/test/__mocks__/styles.js',
    },
    transform: {
        '\\.tsx?$': 'ts-jest',
    },
    testRegex: '.spec.(tsx?|ts?)$',
    testPathIgnorePatterns: ['../node_modules/'],
    coverageReporters: ["json", "html"],
};
