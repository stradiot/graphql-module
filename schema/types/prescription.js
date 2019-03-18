const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean } = require('graphql');
const sqlite = require('sqlite-module');

const DeviceTypeType = new GraphQLObjectType({
    name: 'DeviceType',
    fields: () => ({
        typeId: { type: GraphQLInt },
        type: { type: GraphQLString },
        supplier: { type: GraphQLString },
        model: { type: GraphQLString },
        details: { type: GraphQLString },
        parameters: {
            type: new GraphQLList(DeviceTypeParamType),
            resolve(parent, args){
                const parameters = sqlite.getTypeParams({ typeId: parent.typeId });
                return parameters.map((parameter) => ({
                    typeId: parameter.fk_type_id,
                    paramId: parameter.fk_param_id,
                    protocolId: parameter.fk_protocol_id,
                    name: parameter.name,
                    units: parameter.units,
                    defVal: parameter.def_val,
                    rrdEnable: parameter.rrd_enable,
                    details: parameter.details
                }));
            }
        }
    })
});

const DeviceTypeParamType = new GraphQLObjectType({
    name: 'DeviceTypeParam',
    fields: () => ({
        type: {
            type: DeviceTypeType,
            resolve(parent, args){
                const type = sqlite.getDeviceType(parent);
                return !!type ? {
                    typeId: type.type_id,
                    type: type.type,
                    supplier: type.supplier,
                    model: type.model,
                    details: type.details
                } : undefined;
            }
        },
        parameter: {
            type: ParameterType,
            resolve(parent, args){
                const param = sqlite.getParam(parent);
                return !!param ? {
                    paramId: param.param_id,
                    name: param.name
                } : undefined;
            }
        },
        protocol : {
            type: ProtocolType,
            resolve(parent, args){
                const protocol = sqlite.getProtocol(parent);
                return !!protocol ? {
                    protocolId: protocol.protocol_id,
                    name: protocol.name
                } : undefined;
            }
        },
        name: { type: GraphQLString },
        units: { type: GraphQLString },
        defVal: { type: GraphQLString },
        rrdEnable: { type: GraphQLBoolean },
        details: { type: GraphQLString },
    })
});

const ProtocolType = new GraphQLObjectType({
    name: 'Protocol',
    fields: () => ({
        protocolId: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
});

const ParameterType = new GraphQLObjectType({
    name: 'Parameter',
    fields: () => ({
        paramId: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
});

module.exports = {
    ParameterType,
    ProtocolType,
    DeviceTypeType,
    DeviceTypeParamType
};
