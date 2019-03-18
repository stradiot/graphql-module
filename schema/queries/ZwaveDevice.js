const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLInt } = require('graphql');
const { ZwaveDeviceType } = require('../types/zwave');
const sqlite = require('sqlite-module');

const ZwaveDevice = {
    type: ZwaveDeviceType,
    args: {
        moduleId: { type: new GraphQLNonNull(GraphQLID) } ,
        nodeId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args){
        const device = sqlite.getZwaveDevice(args);
        return !!device ? {
            moduleId: device.module_id,
            nodeId: device.node_id,
            manufacturer: device.manufacturer,
            product: device.product,
            type: device.type
        } : undefined;
    }
};

module.exports = ZwaveDevice;
