const { GraphQLObjectType } = require('graphql');
const subscriptions = require('require-all')(__dirname);
const path = require('path');

delete subscriptions[path.basename(__filename, '.js')];

const Subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: subscriptions
});

module.exports = Subscription;
