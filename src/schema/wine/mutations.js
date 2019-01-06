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
import WineType from './WineType';
import { ValidationError } from '../../errors';
import type Context from '../../Context';

const inputFields = {
  vintage: {
    type: GraphQLString,
  },
  wineName: {
    type: GraphQLString,
  },
  description: {
    type: GraphQLString,
  },
};

const outputFields = {
  wines: {
    type: WineType,
  },
};

const addWine = mutationWithClientMutationId({
  name: 'AddWine',
  inputFields,
  outputFields,
  async mutateAndGetPayload(input: any, ctx: Context) {
    const { data, errors } = validate(input, ctx);

    if (errors.length) {
      throw new ValidationError(errors);
    }

    // const { type: wineType } = fromGlobalId(input.wineId);

    const rows = await db
      .table('wines')
      .insert(data)
      .returning('id');
    return ctx.wineById.load(rows[0]).then(wine => ({ wine }));
  },
});

export default {
  addWine,
};
