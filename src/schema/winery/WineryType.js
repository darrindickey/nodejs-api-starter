import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../node';
// import type Context from '../../Context';

export default new GraphQLObjectType({
  name: 'Winery',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    wineryName: {
      type: GraphQLString,
      resolve(parent) {
        return parent.winery_name;
      },
    },

    address1: {
      type: GraphQLString,
    },

    address2: {
      type: GraphQLString,
    },

    city: {
      type: GraphQLString,
    },

    state: {
      type: GraphQLString,
    },

    zipCode: {
      type: GraphQLString,
    },

    phone: {
      type: GraphQLString,
    },

    website: {
      type: GraphQLString,
    },

    latitude: {
      type: GraphQLString,
    },

    longitude: {
      type: GraphQLString,
    },

    imageUrl: {
      type: GraphQLString,
    },

    logoUrl: {
      type: GraphQLString,
    },

    // imageUrl: {
    //   type: GraphQLString,
    //   resolve(parent) {
    //     return parent.image_url;
    //   },
    // },

    // emails: {
    //   type: new GraphQLList(EmailType),
    //   resolve(parent, args, ctx: Context) {
    //     return parent.id === ctx.user.id
    //       ? ctx.emailsByUserId.load(parent.id)
    //       : null;
    //   },
    // },
  },
});
