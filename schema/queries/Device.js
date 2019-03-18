const { GraphQLNonNull, GraphQLInt } = require('graphql');
const sqlite = require('sqlite-module');
const { DeviceType } = require('../types/instance');

const Device = {
    type: DeviceType,
    args: { devId: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve(parent, args){
        const device = sqlite.getDevice(args);
        return !!device ? {
            devId: device.dev_id,
            typeId: device.fk_type_id,
            name: device.name,
            details: device.details,
            created: device.created
        } : undefined;
    }
};

module.exports = Device;
