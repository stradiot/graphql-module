const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');

const ZwaveAddNodeResultType =new GraphQLObjectType({
    name: 'ZwaveAddNodeResult',
    fields: () => ({
        moduleId: { type: GraphQLString },
        success: { type: GraphQLString }
    })
});

const zwaveAddNode = {
    type: ZwaveAddNodeResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args){
        zwave.addNode(args.moduleId);

        return {
            success: true,
            ...args
        };
    }
};

module.exports = zwaveAddNode;
