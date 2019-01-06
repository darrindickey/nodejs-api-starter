import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../node';
// import type Context from '../../Context';

export default new GraphQLObjectType({
  name: 'Wine',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    wineName: {
      type: GraphQLString,
      resolve(parent) {
        return parent.wine_name;
      },
    },

    vintage: {
      type: GraphQLString,
    },

    description: {
      type: new GraphQLNonNull(GraphQLString),
    },

    labelUrl: {
      type: GraphQLString,
    },

    // wineType: {
    //   type: GraphQLString,
    // },

    abvPercent: {
      type: GraphQLString,
    },

    // imageUrl: {
    //   type: GraphQLString,
    //   resolve(parent) {
    //     return parent.image_url;
    //   },
    // },
  },
});
