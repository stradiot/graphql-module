const { GraphQLNonNull, GraphQLInt } = require('graphql');
const sqlite = require('sqlite-module');
const { DeviceTypeType } = require('../types/prescription');

const DeviceType = {
    type: DeviceTypeType,
    args: { typeId: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve(parent, args){
        const type = sqlite.getDeviceType(args);
        return !!type ? {
            typeId: type.type_id,
            type: type.type,
            supplier: type.supplier,
            model: type.model,
            details: type.details
        } : undefined;
    }
};

module.exports = DeviceType;
