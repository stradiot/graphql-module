const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');

const ZwaveDisablePollResultType =new GraphQLObjectType({
    name: 'ZwaveDisablePollResult',
    fields: () => ({
        moduleId: { type: GraphQLString },
        valueId: { type: GraphQLString },
        success: { type: GraphQLString }
    })
});

const zwaveDisablePoll = {
    type: ZwaveDisablePollResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        valueId: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args){
        const { moduleId, valueId } = args;
        zwave.disablePoll(moduleId, valueId);

        return {
            success: true,
            ...args
        };
    }
};

module.exports = zwaveDisablePoll;
