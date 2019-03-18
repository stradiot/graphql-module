const { GraphQLList } = require('graphql');
const sqlite = require('sqlite-module');
const { DeviceTypeType } = require('../types/prescription');

const DeviceTypes = {
    type: new GraphQLList(DeviceTypeType),
    resolve(parent, args){
        const types = sqlite.getDeviceTypes();
        return types.map(({ type_id, ...rest }) => ({
            typeId: type_id,
            ...rest
        }));
    }
};

module.exports = DeviceTypes;
