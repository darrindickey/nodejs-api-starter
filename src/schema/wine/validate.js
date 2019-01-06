/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import validator from 'validator';

// import { ValidationError } from '../../errors';
import type Context from '../../Context';
import type { ValidationOutput } from '../../types';

export default function validate(input: any, ctx: Context): ValidationOutput {
  const errors = [];
  const data = {};
  const { t } = ctx;

  // if (!user) {
  //   throw new ValidationError([
  //     { key: '', message: t('Only authenticated users can add wines.') },
  //   ]);
  // }

  if (typeof input.wineName === 'undefined' || input.wineName.trim() === '') {
    errors.push({
      key: 'wineName',
      message: t('The wine name field cannot be empty.'),
    });
  } else if (!validator.isLength(input.wineName, { min: 1, max: 250 })) {
    errors.push({
      key: 'wineName',
      message: t('The wine name must be between 20 and 2000 characters long.'),
    });
  } else {
    data.wineName = input.wineName;
    data.vintage = input.vintage;
    data.description = input.description;
  }

  return { data, errors };
}
