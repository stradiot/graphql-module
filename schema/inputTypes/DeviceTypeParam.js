const {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean } = require('graphql');

const InputDeviceTypeParamType = new GraphQLInputObjectType({
    name: 'InputDeviceTypeParam',
    fields: () => ({
        paramId: { type: new GraphQLNonNull(GraphQLInt) },
        protocolId: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        units: { type: GraphQLString },
        defVal: { type: new GraphQLNonNull(GraphQLString) },
        rrdEnable: { type: new GraphQLNonNull(GraphQLBoolean) },
        details: { type: GraphQLString },
    })
});

module.exports = InputDeviceTypeParamType;
