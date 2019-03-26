const {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLObjectType } = require('graphql');
const sqlite = require('sqlite-module');
const rrd = require('rrd-module');

const RemoveDeviceResultType =new GraphQLObjectType({
    name: 'RemoveDeviceResult',
    fields: () => ({
        devId: { type: GraphQLInt },
        success: { type: GraphQLBoolean }
    })
});

const removeDevice = {
    type: RemoveDeviceResultType,
    args: {
        devId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args){
        const params = sqlite.getDeviceParams(args);

        params.filter((param) => !!param.rrd_enable).forEach((param) => {
            rrd.remove(param.dev_param_id);
        });

        const success = sqlite.removeDevice(args);

        return {
            ...args,
            success
        };
    }
};

module.exports = removeDevice;
