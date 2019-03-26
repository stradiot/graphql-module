const zwave = require('zwave-interface-module');
const { ZwaveDeviceType } = require('../types/zwave');
const socket = require('../pubsub');

zwave.on('node ready', (data) => socket.publish('zwave node ready', data));

const zwaveNodeReady = {
    type:  ZwaveDeviceType,
    resolve: (payload) => payload,
    subscribe(){
        return socket.asyncIterator(['zwave node ready']);
    }
};

module.exports = zwaveNodeReady;
