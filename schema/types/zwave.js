const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean } = require('graphql');
const sqlite = require('sqlite-module');

const ZwaveDeviceType = new GraphQLObjectType({
  name: 'ZwaveDevice',
  fields: () => ({
    nodeId: { type: GraphQLInt },
    moduleId: { type: GraphQLID },
    manufacturer:  { type: GraphQLString },
    product: { type: GraphQLString },
    type: { type: GraphQLString },
    parameters: {
        type: new GraphQLList(ZwaveParameterType),
        resolve(parent, args){
            const parameters = sqlite.getZwaveDevParams({
                moduleId: parent.moduleId,
                nodeId: parent.nodeId
            });
            return parameters.map((parameter) => ({
                devParamId: parameter.fk_param_id,
                moduleId: parameter.module_id,
                nodeId: parameter.node_id,
                valueId: parameter.value_id,
                possibleValues: JSON.parse(parameter.possible_values),
                pollIntensity: parameter.poll_intensity,
                name: parameter.name,
                value: parameter.value,
                units: parameter.units,
                help: parameter.help,
                writable: parameter.writable,
                polled: parameter.polled
            }));
        }
    }
  })
});

const ZwaveParameterType = new GraphQLObjectType({
    name: 'ZwaveDevParam',
    fields: () => ({
      device: {
          type: ZwaveDeviceType,
          resolve(parent, args){
              const device = sqlite.getZwaveDevice(parent);
              return !!device ? {
                  moduleId: device.module_id,
                  nodeId: device.node_id,
                  manufacturer: device.manufacturer,
                  product: device.product,
                  type: device.type
              } : undefined;
          }
      },
      devParamId: { type: GraphQLInt },
      valueId: { type: GraphQLID },
      name:  { type: GraphQLString },
      value: { type: GraphQLString },
      units: { type: GraphQLString },
      help: { type: GraphQLString },
      writable: { type: GraphQLBoolean },
      possibleValues: { type: new GraphQLList(GraphQLString) },
      polled: { type: GraphQLBoolean },
      pollIntensity: { type: GraphQLInt }
    })
});

module.exports = {
    ZwaveDeviceType,
    ZwaveParameterType
};
