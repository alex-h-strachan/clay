const path = require('path');
const assert = require('assert');
const fs = require('fs');

let kiln = require('../');

describe('The Clay Library', () => {
    it('Imports clay successfully', () => {
        const clay = kiln();
        assert(clay);
    });

    it('Has the same properties as appear in the lib/tools folder', () => {
        const clay = kiln();

        let toolsDir = fs.readdirSync(path.join(__dirname, '../lib/tools'));

        toolsDir = toolsDir
            .filter((file) => '.DS_Store' !== file)
            .map(data => data.replace(/\.\w+$/, ''));

        const expectedKeys = [
            'options',
            ...toolsDir,
        ];

        assert.deepEqual(Object.keys(clay), expectedKeys);
    });
});
