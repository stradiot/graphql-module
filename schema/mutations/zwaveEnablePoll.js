const {
    GraphQLNonNull,
    GraphQLInt, 
    GraphQLString,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');

const ZwaveEnablePollResultType =new GraphQLObjectType({
    name: 'ZwaveEnablePollResult',
    fields: () => ({
        moduleId: { type: GraphQLString },
        valueId: { type: GraphQLString },
        intensity: { type: GraphQLInt },
        success: { type: GraphQLString }
    })
});

const zwaveEnablePoll = {
    type: ZwaveEnablePollResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        valueId: { type: new GraphQLNonNull(GraphQLString) },
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
