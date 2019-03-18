const { GraphQLList } = require('graphql');
const ActiveModuleType = require('../types/ActiveModule');
const { activeModules } = require('active-modules-module');

const ActiveModules = {
    type: new GraphQLList(ActiveModuleType),
    resolve(parent, args){
        return Object.entries(activeModules).map((entry) => ({ moduleId: entry[0],  ...entry[1] }));
    }
};

module.exports = ActiveModules;
