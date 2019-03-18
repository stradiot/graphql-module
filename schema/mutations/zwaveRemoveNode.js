const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');

const ZwaveRemoveNodeResultType =new GraphQLObjectType({
    name: 'ZwaveRemoveNodeResult',
    fields: () => ({
        moduleId: { type: GraphQLString },
        success: { type: GraphQLString }
    })
});

const zwaveRemoveNode = {
    type: ZwaveRemoveNodeResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) }
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
