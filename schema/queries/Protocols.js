const { GraphQLList } = require('graphql');
const sqlite = require('sqlite-module');
const { ProtocolType } = require('../types/prescription');

const Protocols = {
    type: new GraphQLList(ProtocolType),
    resolve(parent, args){
        const protocols = sqlite.getProtocols();
        return protocols.map(({ protocol_id, ...rest }) => ({
            protocolId: protocol_id,
            ...rest
        }));
    }
};

module.exports = Protocols;
