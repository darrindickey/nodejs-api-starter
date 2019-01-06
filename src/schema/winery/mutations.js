/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import db from '../../db';
import validate from './validate';
import WineryType from './WineryType';
import { ValidationError } from '../../errors';
import type Context from '../../Context';

const inputFields = {
  wineryName: {
    type: GraphQLString,
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
};

const outputFields = {
  winery: {
    type: WineryType,
  },
};

const addWinery = mutationWithClientMutationId({
  name: 'AddWinery',
  inputFields,
  outputFields,
  async mutateAndGetPayload(input: any, ctx: Context) {
    const { data, errors } = validate(input, ctx);

    if (errors.length) {
      throw new ValidationError(errors);
    }

    // const { type: wineryType, id: wineryId } = fromGlobalId(input.wineryId);
    // console.log('wineryType', wineryType)

    const rows = await db
      .table('winery')
      .insert(data)
      .returning('id');
    return ctx.wineryById.load(rows[0]).then(winery => ({ winery }));
  },
});

export default {
  addWinery,
};
