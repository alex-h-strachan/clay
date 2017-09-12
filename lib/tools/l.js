/* eslint-disable no-console */

module.exports = {
    error: function() {
        if (
            'error' === global.clay.options.log_level ||
            'warn' === global.clay.options.log_level ||
            'verbose' === global.clay.options.log_level
        ) {
            console.error.apply(this, arguments);
        }
    },
    warn: function() {
        if (
            'warn' === global.clay.options.log_level ||
            'verbose' === global.clay.options.log_level
        ) {
            console.warn.apply(this, arguments);
        }
    },
    verbose: function() {
        if (
            'verbose' === global.clay.options.log_level
        ) {
            console.log.apply(this, arguments);
        }
    },
};
