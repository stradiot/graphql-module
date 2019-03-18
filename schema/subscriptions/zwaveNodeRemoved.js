const {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');
const socket = require('../pubsub');

zwave.on('node removed', (data) => socket.publish('zwave node removed', data));

const ZwaveNodeRemovedType =new GraphQLObjectType({
    name: 'ZwaveDeviceRemoved',
    fields: () => ({
        moduleId: { type: GraphQLString },
        nodeId: { type: GraphQLInt }
    })
});

const zwaveNodeRemoved = {
    type:  ZwaveNodeRemovedType,
    resolve: (payload) => payload,
    subscribe(){
        return socket.asyncIterator(['zwave node removed']);
    }
};

module.exports = zwaveNodeRemoved;
