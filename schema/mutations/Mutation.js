const { GraphQLObjectType } = require('graphql');
const mutations = require('require-all')(__dirname);
const path = require('path');

delete mutations[path.basename(__filename, '.js')];

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
});

module.exports = Mutation;
