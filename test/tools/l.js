const kiln = require('../../');
const assert = require('assert');

const nativeLog = console.log;
const nativeWarn = console.warn;
const nativeError = console.error;

const collectLogs = (collectionList) => {
    let collector = (...args) => {
        collectionList.push(...args);
    };

    console.log = collector;
    console.warn = collector;
    console.error = collector;
};

const restoreLogs = () => {
    console.log = nativeLog;
    console.warn = nativeWarn;
    console.error = nativeError;
};

describe('l', () => {
    it('Has error, warn & verbose', () => {
        const clay = kiln();
        assert.deepEqual(
            Object.keys(clay.l),
            ['error', 'warn', 'verbose']
        );
    });
    it('respects the verbose log level', () => {
        const logs = [];
        collectLogs(logs);

        const clayWithErrorLevel = kiln({logLevel: 'verbose'});

        clayWithErrorLevel.l.error('1');
        clayWithErrorLevel.l.warn('2');
        clayWithErrorLevel.l.verbose('3', '4');

        restoreLogs();

        assert.deepEqual(['1', '2', '3', '4'], logs);
    });
    it('respects the warn log level', () => {
        const logs = [];
        collectLogs(logs);

        const clayWithErrorLevel = kiln({logLevel: 'warn'});

        clayWithErrorLevel.l.error('1');
        clayWithErrorLevel.l.warn('2');
        clayWithErrorLevel.l.verbose('3', '4');

        restoreLogs();

        assert.deepEqual(['1', '2'], logs);
    });
    it('respects the error log level', () => {
        const logs = [];
        collectLogs(logs);

        const clayWithErrorLevel = kiln({logLevel: 'error'});

        clayWithErrorLevel.l.error('1');
        clayWithErrorLevel.l.warn('2');
        clayWithErrorLevel.l.verbose('3', '4');

        restoreLogs();

        assert.deepEqual(['1'], logs);
    });
});

restoreLogs();
