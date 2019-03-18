const { GraphQLList } = require('graphql');
const sqlite = require('sqlite-module');
const { ParameterType } = require('../types/prescription');

const Parameters = {
    type: new GraphQLList(ParameterType),
    resolve(parent, args){
        const params = sqlite.getParams();
        return params.map(({ param_id, ...rest }) => ({
            paramId: param_id,
            ...rest
        }));
    }
};

module.exports = Parameters;
