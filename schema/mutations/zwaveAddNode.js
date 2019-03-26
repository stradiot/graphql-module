const {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');

const ZwaveAddNodeResultType =new GraphQLObjectType({
    name: 'ZwaveAddNodeResult',
    fields: () => ({
        moduleId: { type: GraphQLID },
        success: { type: GraphQLBoolean }
    })
});

const zwaveAddNode = {
    type: ZwaveAddNodeResultType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLID) }
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
