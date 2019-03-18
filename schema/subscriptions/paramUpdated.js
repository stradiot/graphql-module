const {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');
const sqlite = require('sqlite-module');
const { DeviceParamType } = require('../types/instance');
const socket = require('../pubsub');

zwave.on('parameter value changed', (data) => socket.publish('parameter updated', data));

const paramUpdated = {
    type: DeviceParamType,
    resolve(payload){
        const parameter = sqlite.getDeviceParam(payload);

        return {
            devParamId: parameter.dev_param_id,
            paramId: parameter.fk_param_id,
            devId: parameter.fk_dev_id,
            protocolId: parameter.fk_protocol_id,
            name: parameter.name,
            units: parameter.units,
            value: parameter.value,
            timestamp: parameter.timestamp,
            rrdEnable: parameter.rrd_enable,
            polled: parameter.polled,
            details: parameter.details
        };
    },
    subscribe(){
        return socket.asyncIterator(['parameter updated']);
    }
};

module.exports = paramUpdated;
