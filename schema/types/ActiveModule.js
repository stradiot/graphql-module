const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean } = require('graphql');

const ActiveModuleType = new GraphQLObjectType({
    name: 'ActiveModule',
    fields: () => ({
        moduleId: { type: GraphQLID },
        info: { type: GraphQLString },
        type: { type: GraphQLString },
        available: { type: GraphQLBoolean }
    })
});

module.exports = ActiveModuleType;
