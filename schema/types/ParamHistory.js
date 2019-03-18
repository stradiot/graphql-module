const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList } = require('graphql');
const rrd = require('rrd-module');

const ParamHistoryType = new GraphQLObjectType({
    name: 'ParamHistory',
    fields: () => ({
        paramId: { type: GraphQLInt },
        start: { type: GraphQLInt },
        end: { type: GraphQLInt },
        resolution: { type: GraphQLInt },
        data: {
            type: new GraphQLList(RRDRecordType),
            async resolve(parent, args){
                const { paramId, start, end, resolution } = parent;
                const data = await rrd.fetch(paramId, start, end, resolution);
                return data.map((record) => ({
                    timestamp: record.time,
                    value: record.values.ds
                }));
            }
        }
    })
});

const RRDRecordType = new GraphQLObjectType({
    name: 'RRDRecord',
    fields: () => ({
        timestamp: { type: GraphQLInt },
        value: { type: GraphQLInt }
    })
});

module.exports = ParamHistoryType;
