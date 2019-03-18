const {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType } = require('graphql');
const sqlite = require('sqlite-module');
const zwave = require('zwave-interface-module');
const { DeviceParamType } = require('../types/instance');
const socket = require('../pubsub');

function parseValue(value) {
        if (!Number.isNaN(Number(value))) {
            return Number(value);
        } else if (value === 'false' || value === 'true') {
            return value === 'true';
        } else {
            return value;
        }
};

const SetValueResultType =new GraphQLObjectType({
    name: 'SetValueResult',
    fields: () => ({
        paramId: { type: GraphQLInt },
        value: { type: GraphQLString },
        success: { type: GraphQLBoolean }
    })
});

const setValue = {
    type: SetValueResultType,
    args: {
        paramId: { type: new GraphQLNonNull(GraphQLInt) },
        value: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args){
        const result = sqlite.updateDeviceParam(args);
        if (!result) {
            return {
                ...args,
                success: false
            };
        }
        const { fk_protocol_id: protocolId } = sqlite.getDeviceParam(args);
        const { name: protocol } = sqlite.getProtocol({ protocolId });

        switch (protocol) {
            case 'Z-Wave':
                zwave.setValue(args.paramId, parseValue(args.value));
                break;
        }

        socket.publish('parameter updated', {
            paramId: args.paramId
        });

        return {
            ...args,
            success: true
        };
    }
};

module.exports = setValue;
