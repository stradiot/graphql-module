const { GraphQLList } = require('graphql');
const sqlite = require('sqlite-module');
const { DeviceType } = require('../types/instance');

const Devices = {
    type: new GraphQLList(DeviceType),
    resolve(parent, args){
        const devices = sqlite.getDevices();
        return devices.map(({ dev_id, fk_type_id, ...rest }) => ({
            devId: dev_id,
            typeId: fk_type_id,
            ...rest
        }));
    }
};

module.exports = Devices;
