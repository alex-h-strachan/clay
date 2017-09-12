/* eslint-disable no-console */

module.exports = (options) => ({
    error: () => {
        if (
            'error' === options.log_level ||
            'warn' === options.log_level ||
            'verbose' === options.log_level
        ) {
            console.error.apply(this, arguments);
        }
    },
    warn: () => {
        if (
            'warn' === options.log_level ||
            'verbose' === options.log_level
        ) {
            console.warn.apply(this, arguments);
        }
    },
    verbose: () => {
        if (
            'verbose' === options.log_level
        ) {
            console.log.apply(this, arguments);
        }
    },
});
