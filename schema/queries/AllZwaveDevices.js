const { GraphQLList } = require('graphql');
const { ZwaveDeviceType } = require('../types/zwave');
const sqlite = require('sqlite-module');

const AllZwaveDevices = {
    type: new GraphQLList(ZwaveDeviceType),
    resolve(parent, args){
        const devices = sqlite.getAllZwaveDevices();
        return devices.map(({ node_id, module_id, ...rest }) => ({
            nodeId: node_id,
            moduleId: module_id,
            ...rest
        }));
    }
};

module.exports = AllZwaveDevices;
