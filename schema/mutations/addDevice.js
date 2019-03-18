const { GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');
const sqlite = require('sqlite-module');
const rrd = require('rrd-module');
const { DeviceType } = require('../types/instance');

const addDevice = {
    type: DeviceType,
    args: {
        typeId: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        details: { type: GraphQLString }
    },
    resolve(parent, args){
        const { devId, created } = sqlite.createDevInstance(args);
        const params = sqlite.getDeviceParams({ devId });

        params.filter((param) => !!param.rrd_enable).forEach((param) => {
            rrd.create(param.dev_param_id);
        });
        return {
            devId,
            created,
            ...args
        };
    }
};

module.exports = addDevice;
