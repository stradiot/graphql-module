const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');

const ZwaveRemoveNodeResultType =new GraphQLObjectType({
    name: 'ZwaveRemoveNodeResult',
    fields: () => ({
        moduleId: { type: GraphQLID },
        success: { type: GraphQLBoolean }
    })
});

const zwaveRemoveNode = {
    type: ZwaveRemoveNodeResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args){
        zwave.removeNode(args.moduleId);

        return {
            success: true,
            ...args
        };
    }
};

module.exports = zwaveRemoveNode;
