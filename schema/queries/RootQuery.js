const { GraphQLObjectType } = require('graphql');
const queries = require('require-all')(__dirname);
const path = require('path');

delete queries[path.basename(__filename, '.js')];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: queries
});

module.exports = RootQuery;
