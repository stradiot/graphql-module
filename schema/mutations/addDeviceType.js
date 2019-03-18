const { GraphQLNonNull } = require('graphql');
const sqlite = require('sqlite-module');
const InputDeviceTypeType = require('../inputTypes/DeviceType');
const { DeviceTypeType } = require('../types/prescription');

const addDeviceType = {
    type: DeviceTypeType,
    args: { config: { type: new GraphQLNonNull(InputDeviceTypeType) } },
    resolve(parent, args){
        const { parameters: params, ...config } = args.config;
        const { typeId } = sqlite.createDevType({ params, ...config });
        return { typeId, ...config };
    }
};

module.exports = addDeviceType;
