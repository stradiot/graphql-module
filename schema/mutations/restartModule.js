const {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID,
    GraphQLObjectType } = require('graphql');
const mqtt = require('mqtt-module');

const RestartModuleResultType =new GraphQLObjectType({
    name: 'RestartModuleResult',
    fields: () => ({
        moduleId: { type: GraphQLID },
        success: { type: GraphQLBoolean }
    })
});

const restartModule = {
    type: RestartModuleResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args){
        mqtt.restartModule(args.moduleId);

        return {
            ...args,
            success: true
        };
    }
};

module.exports = restartModule;
