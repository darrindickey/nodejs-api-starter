/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import EmailType from './EmailType';
import { nodeInterface } from '../node';
import type Context from '../../Context';

export default new GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    displayName: {
      type: GraphQLString,
      resolve(parent) {
        return parent.display_name;
      },
    },

    imageUrl: {
      type: GraphQLString,
      resolve(parent) {
        return parent.image_url;
      },
    },

    emails: {
      type: new GraphQLList(EmailType),
      resolve(parent, args, ctx: Context) {
        return parent.id === ctx.user.id
          ? ctx.emailsByUserId.load(parent.id)
          : null;
      },
    },

    firstName: {
      type: GraphQLString,
      resolve(parent) {
        return parent.first_name;
      },
    },

    lastName: {
      type: GraphQLString,
      resolve(parent) {
        return parent.last_name;
      },
    },

    username: {
      type: GraphQLString,
      resolve(parent) {
        return parent.username;
      },
    },

    phoneNumber: {
      type: GraphQLString,
      resolve(parent) {
        return parent.phone_number;
      },
    },

    locationCity: {
      type: GraphQLString,
      resolve(parent) {
        return parent.location_city;
      },
    },

    locationState: {
      type: GraphQLString,
      resolve(parent) {
        return parent.location_state;
      },
    },

    locationZipcode: {
      type: GraphQLString,
      resolve(parent) {
        return parent.location_zipcode;
      },
    },

    sex: {
      type: GraphQLString,
      resolve(parent) {
        return parent.sex;
      },
    },

    socialFacebook: {
      type: GraphQLString,
      resolve(parent) {
        return parent.social_facebook;
      },
    },

    socialTwitter: {
      type: GraphQLString,
      resolve(parent) {
        return parent.social_twitter;
      },
    },

    socialInstagram: {
      type: GraphQLString,
      resolve(parent) {
        return parent.social_instagram;
      },
    },

    socialFoursquare: {
      type: GraphQLString,
      resolve(parent) {
        return parent.social_foursquare;
      },
    },

    socailGooglePlus: {
      type: GraphQLString,
      resolve(parent) {
        return parent.social_google_plus;
      },
    },
  },
});
