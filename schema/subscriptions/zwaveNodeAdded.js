const {
    GraphQLInt,
    GraphQLID,
    GraphQLObjectType } = require('graphql');
const zwave = require('zwave-interface-module');
const socket = require('../pubsub');

zwave.on('node added', (data) => socket.publish('zwave node added', data));

const ZwaveNodeAddedType =new GraphQLObjectType({
    name: 'ZwaveNodeAdded',
    fields: () => ({
        moduleId: { type: GraphQLID },
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
