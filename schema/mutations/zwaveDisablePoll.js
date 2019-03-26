const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');

const ZwaveDisablePollResultType =new GraphQLObjectType({
    name: 'ZwaveDisablePollResult',
    fields: () => ({
        moduleId: { type: GraphQLID },
        valueId: { type: GraphQLID },
        success: { type: GraphQLBoolean }
    })
});

const zwaveDisablePoll = {
    type: ZwaveDisablePollResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLID) },
        valueId: { type: new GraphQLNonNull(GraphQLID) }
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
