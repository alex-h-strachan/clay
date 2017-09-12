/* eslint-disable no-console */

module.exports = (options) => ({
    error: (...args) => {
        if (
            'error' === options.logLevel ||
            'warn' === options.logLevel ||
            'verbose' === options.logLevel
        ) {
            console.error(...args);
        }
    },
    warn: (...args) => {
        if (
            'warn' === options.logLevel ||
            'verbose' === options.logLevel
        ) {
            console.warn(...args);
        }
    },
    verbose: (...args) => {
        if (
            'verbose' === options.logLevel
        ) {
            console.log(...args);
        }
    },
});
