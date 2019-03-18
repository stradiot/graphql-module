const { GraphQLNonNull, GraphQLString } = require('graphql');
const sqlite = require('sqlite-module');
const { ParameterType } = require('../types/prescription');

const addParameter = {
    type: ParameterType,
    args: { name: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(parent, args){
        const paramId = sqlite.addParam(args);
        return !!paramId ? {
            paramId,
            name: args.name
        } : undefined;
    }
};

module.exports = addParameter;
