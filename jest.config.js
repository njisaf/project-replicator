module.exports = {
    transform: {
        '^.+\\.svelte$': 'svelte-jester',  // Use svelte-jester for .svelte files
        '^.+\\.ts$': 'ts-jest',             // Use ts-jest for TypeScript files
        '^.+\\.js$': 'babel-jest'           // Use babel-jest for JavaScript files
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testEnvironment: 'jsdom',
};
