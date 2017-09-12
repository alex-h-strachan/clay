const uuid = require('uuid').v4;
const fs = require('fs');

function fire(options) {
    const clay = {};
    clay.options = options || {};

    setDefaults(clay);

    let toolsDir = fs.readdirSync(__dirname + '/lib/tools');

    toolsDir = toolsDir.filter((file) => file !== '.DS_Store');

    const toolsArray = toolsDir.map((data) => {return data.replace(/\.\w+$/, '');});

    // mount the tools
    for (let i = 0; i < toolsArray.length; i++) {
        if(clay[toolsArray[i]] !== undefined) {
            throw new Error(`duplicate name ${toolsDir[i]} in tools directory`);
        }
        clay[toolsArray[i]] = require(__dirname + '/lib/tools/' + toolsDir[i]);
    }

    return clay;
}

function setDefaults(clay) {
    clay.options.dataBinding = clay.options.dataBinding ||
        function() {};
    clay.options.errorBinding = clay.options.errorBinding || 
        function(req, err) {
            var eventID = uuid();
            clay.l.error(`An error occured with ID ${eventID}`);
            clay.l.error(err);
            return `An error occured, for more information search for ${eventID} in the logs`;
        };
}

module.exports = fire;
