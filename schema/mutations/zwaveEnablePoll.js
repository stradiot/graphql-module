const {
    GraphQLNonNull,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');

const ZwaveEnablePollResultType =new GraphQLObjectType({
    name: 'ZwaveEnablePollResult',
    fields: () => ({
        moduleId: { type: GraphQLID },
        valueId: { type: GraphQLID },
        intensity: { type: GraphQLInt },
        success: { type: GraphQLBoolean }
    })
});

const zwaveEnablePoll = {
    type: ZwaveEnablePollResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLID) },
        valueId: { type: new GraphQLNonNull(GraphQLID) },
        intensity: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args){
        const { moduleId, valueId, intensity } = args;
        zwave.enablePoll(moduleId, valueId, intensity);

        return {
            success: true,
            ...args
        };
    }
};

module.exports = zwaveEnablePoll;
