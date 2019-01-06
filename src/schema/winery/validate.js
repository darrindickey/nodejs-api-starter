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
  // const { t, user } = ctx;

  // if (!user) {
  //   throw new ValidationError([
  //     { key: '', message: t('Only authenticated users can add wines.') },
  //   ]);
  // }

  if (
    typeof input.wineryName === 'undefined' ||
    input.wineryName.trim() === ''
  ) {
    errors.push({
      key: 'wineryName',
      message: t('The winery name field cannot be empty.'),
    });
  } else if (!validator.isLength(input.wineryName, { min: 1, max: 250 })) {
    errors.push({
      key: 'wineryName',
      message: t(
        'The winery name must be between 20 and 2000 characters long.',
      ),
    });
  } else {
    data.winery_name = input.wineryName;
    data.address1 = input.address1;
    data.address2 = input.address2;
    data.city = input.city;
    data.state = input.state;
    data.zip_code = input.zipCode;
    data.phone = input.phone;
    data.website = input.website;
    data.image_url = input.imageUrl;
    data.logo_url = input.logoUrl;
  }

  return { data, errors };
}
