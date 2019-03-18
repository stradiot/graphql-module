const { GraphQLNonNull, GraphQLInt } = require('graphql');
const rrd = require('rrd-module');
const ParamHistoryType = require('../types/ParamHistory');

const ParamHistory = {
    type: ParamHistoryType,
    args: {
        paramId: { type: new GraphQLNonNull(GraphQLInt) },
        start: { type: new GraphQLNonNull(GraphQLInt) },
        end: { type: new GraphQLNonNull(GraphQLInt) },
        resolution: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parent, args){
        const { paramId, start, end, resolution } = args;
        return {
            paramId,
            start,
            end,
            resolution
        };
    }
};

module.exports = ParamHistory;
