const {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLObjectType } = require('graphql');
const sqlite = require('sqlite-module');

const MapZwaveResultType =new GraphQLObjectType({
    name: 'MapZwaveResult',
    fields: () => ({
        paramId: { type: GraphQLInt },
        moduleId: { type: GraphQLID },
        valueId: { type: GraphQLID },
        success: { type: GraphQLBoolean }
    })
});

const mapZwave = {
    type: MapZwaveResultType,
    args: {
        paramId: { type: GraphQLInt },
        moduleId: { type: new GraphQLNonNull(GraphQLID) },
        valueId: { type: new GraphQLNonNull(GraphQLID) }
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
