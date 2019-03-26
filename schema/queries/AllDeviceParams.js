const { GraphQLList } = require('graphql');
const sqlite = require('sqlite-module');
const { DeviceParamType } = require('../types/instance');

const AllDeviceParams = {
    type: new GraphQLList(DeviceParamType),
    resolve(parent, args){
        const parameters = sqlite.getAllDeviceParams();
        return parameters.map((parameter) => ({
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
        }));
    }
};

module.exports = AllDeviceParams;
