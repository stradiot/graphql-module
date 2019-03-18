const {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType } = require('graphql');
const sqlite = require('sqlite-module');

const MapZwaveResultType =new GraphQLObjectType({
    name: 'MapZwaveResult',
    fields: () => ({
        paramId: { type: GraphQLInt },
        moduleId: { type: GraphQLString },
        valueId: { type: GraphQLString },
        success: { type: GraphQLBoolean }
    })
});

const mapZwave = {
    type: MapZwaveResultType,
    args: {
        paramId: { type: new GraphQLNonNull(GraphQLInt) },
        moduleId: { type: new GraphQLNonNull(GraphQLString) },
        valueId: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args){
        const result = sqlite.mapZwaveParam(args);

        return {
            ...args,
            success: result
        };
    }
};

module.exports = mapZwave;
