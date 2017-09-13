// Single point to access all test files in app folder
const appContext = require.context('.', true, /\.spec\.js$/);
appContext.keys().forEach(appContext);
