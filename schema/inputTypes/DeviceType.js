const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull } = require('graphql');
const InputDeviceTypeParamType = require('./DeviceTypeParam');
const sqlite = require('sqlite-module');

const InputDeviceTypeType = new GraphQLInputObjectType({
    name: 'InputDeviceType',
    fields: () => ({
        type: { type: new GraphQLNonNull(GraphQLString) },
        supplier: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        details: { type: GraphQLString },
        parameters: { type: new GraphQLNonNull(new GraphQLList(InputDeviceTypeParamType)) }
    })
});

module.exports = InputDeviceTypeType;
