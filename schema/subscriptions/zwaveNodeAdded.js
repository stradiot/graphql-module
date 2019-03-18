const {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');
const socket = require('../pubsub');

zwave.on('node added', (data) => socket.publish('zwave node added', data));

const ZwaveNodeAddedType =new GraphQLObjectType({
    name: 'ZwaveDeviceAdded',
    fields: () => ({
        moduleId: { type: GraphQLString },
        nodeId: { type: GraphQLInt }
    })
});

const zwaveNodeAdded = {
    type:  ZwaveNodeAddedType,
    resolve: (payload) => payload,
    subscribe(){
        return socket.asyncIterator(['zwave node added']);
    }
};

module.exports = zwaveNodeAdded;
