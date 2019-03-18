const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType } = require('graphql');
const mqtt = require('mqtt-module');

const RestartModuleResultType =new GraphQLObjectType({
    name: 'RestartModuleResult',
    fields: () => ({
        moduleId: { type: GraphQLString },
        success: { type: GraphQLString }
    })
});

const restartModule = {
    type: RestartModuleResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) }
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
