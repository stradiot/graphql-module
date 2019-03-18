const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull } = require('graphql');
const { ZwaveDeviceType } = require('../types/zwave');
const sqlite = require('sqlite-module');

const ZwaveDevices = {
    type: new GraphQLList(ZwaveDeviceType),
    args: { moduleId: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent, args){
        const devices = sqlite.getZwaveDevices(args);
        return devices.map(({ node_id, module_id, ...rest }) => ({
            nodeId: node_id,
            moduleId: module_id,
            ...rest
        }));
    }
};

module.exports = ZwaveDevices;
