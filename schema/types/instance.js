const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean } = require('graphql');
const sqlite = require('sqlite-module');
const { ParameterType, ProtocolType, DeviceTypeType } = require('./prescription');

const DeviceType = new GraphQLObjectType({
    name: 'Device',
    fields: () => ({
        devId: { type: GraphQLInt },
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
        name: { type: GraphQLString },
        details: { type: GraphQLString },
        created: { type: GraphQLInt },
        parameters: {
            type: new GraphQLList(DeviceParamType),
            resolve(parent, args){
                const parameters = sqlite.getDeviceParams({ devId: parent.devId });
                return parameters.map((parameter) => ({
                    paramId: parameter.dev_param_id,
                    parameterId: parameter.fk_param_id,
                    devId: parameter.fk_dev_id,
                    protocolId: parameter.fk_protocol_id,
                    name: parameter.name,
                    units: parameter.units,
                    value: parameter.value,
                    timestamp: parameter.timestamp,
                    rrdEnable: parameter.rrd_enable,
                    polled: parameter.polled,
                    details: parameter.details
                }));
            }
        }
    })
});

const DeviceParamType = new GraphQLObjectType({
    name: 'DeviceParam',
    fields: () => ({
        paramId: { type: GraphQLInt },
        parameter: {
            type: ParameterType,
            resolve(parent, args){
                const param = sqlite.getParam({ paramId: parent.parameterId });
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
        device: {
            type: DeviceType,
            resolve(parent, args){
                const device = sqlite.getDevice(parent);
                return !!device ? {
                    devId: device.dev_id,
                    typeId: device.fk_type_id,
                    name: device.name,
                    details: device.details,
                    created: device.created
                } : undefined;
            }
        },
        name: { type: GraphQLString },
        units: { type: GraphQLString },
        value: { type: GraphQLString },
        timestamp: { type: GraphQLInt },
        rrdEnable: { type: GraphQLBoolean },
        polled: { type: GraphQLBoolean },
        details: { type: GraphQLString }
    })
});

module.exports = {
    DeviceType,
    DeviceParamType
};
