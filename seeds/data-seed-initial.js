/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-restricted-syntax, no-await-in-loop */

const faker = require('faker');

module.exports.seed = async db => {
  const roles = [
    {
      id: faker.fake('{{random.uuid}}'),
      role: 'administrator',
    },
    {
      id: faker.fake('{{random.uuid}}'),
      role: 'manager',
    },
    {
      id: faker.fake('{{random.uuid}}'),
      role: 'registered_user',
    },
  ];

  await Promise.all(
    roles.map(role =>
      db
        .table('roles')
        .insert(role)
        .returning('id')
        .then(rows =>
          db
            .table('roles')
            .where('id', '=', rows[0])
            .first('*'),
        )
        .then(row => Object.assign(role, row)),
    ),
  );
  // Create 10 random website users (as an example)
  const users = Array.from({ length: 10 }).map(() => ({
    display_name: faker.name.findName(),
    image_url: faker.internet.avatar(),
    role_id:
      roles[
        faker.random.number({
          min: 0,
          max: roles.length - 1,
        })
      ].id,
  }));

  await Promise.all(
    users.map(user =>
      db
        .table('users')
        .insert(user)
        .returning('id')
        .then(rows =>
          db
            .table('users')
            .where('id', '=', rows[0])
            .first()
            .then(u =>
              db
                .table('emails')
                .insert({
                  user_id: u.id,
                  email: faker.internet.email().toLowerCase(),
                })
                .then(() => u),
            ),
        )
        .then(row => Object.assign(user, row)),
    ),
  );

  // Create 500 stories
  const stories = Array.from({ length: 30 }).map(() =>
    Object.assign(
      {
        author_id:
          users[
            faker.random.number({
              min: 0,
              max: users.length - 1,
            })
          ].id,
        title: faker.lorem
          .sentence(
            faker.random.number({
              min: 4,
              max: 7,
            }),
          )
          .slice(0, -1)
          .substr(0, 80),
      },
      Math.random() > 0.3
        ? {
            text: faker.lorem.text(),
          }
        : {
            url: faker.internet.url(),
          },
      (date => ({
        created_at: date,
        updated_at: date,
      }))(faker.date.past()),
    ),
  );

  await Promise.all(
    stories.map(story =>
      db
        .table('stories')
        .insert(story)
        .returning('id')
        .then(rows =>
          db
            .table('stories')
            .where('id', '=', rows[0])
            .first(),
        )
        .then(row => Object.assign(story, row)),
    ),
  );

  // Create some user comments
  const comments = Array.from({
    length: 2000,
  }).map(() =>
    Object.assign(
      {
        story_id:
          stories[
            faker.random.number({
              min: 0,
              max: stories.length - 1,
            })
          ].id,
        author_id:
          users[
            faker.random.number({
              min: 0,
              max: users.length - 1,
            })
          ].id,
        text: faker.lorem.sentences(
          faker.random.number({
            min: 1,
            max: 10,
          }),
        ),
      },
      (date => ({
        created_at: date,
        updated_at: date,
      }))(faker.date.past()),
    ),
  );

  await Promise.all(
    comments.map(comment =>
      db
        .table('comments')
        .insert(comment)
        .returning('id')
        .then(rows =>
          db
            .table('comments')
            .where('id', '=', rows[0])
            .first(),
        )
        .then(row => Object.assign(comment, row)),
    ),
  );

  const varietals = [
    {
      varietal_name: 'Barbera',
    },
    {
      varietal_name: 'Cabernet Sauvignon',
    },
    {
      varietal_name: 'Chardonel',
    },
    {
      varietal_name: 'Chardonnay',
    },
    {
      varietal_name: 'Dolcetto',
    },
    {
      varietal_name: 'Chenin Blanc',
    },
    {
      varietal_name: 'Fume Blanc',
    },
    {
      varietal_name: 'Gewürztraminer',
    },
    {
      varietal_name: 'Merlot',
    },
    {
      varietal_name: 'Mourvedre',
    },
    {
      varietal_name: 'Mustcat',
    },
    {
      varietal_name: 'Muscat Canelli',
    },
    {
      varietal_name: 'Petite Sirahs',
    },
    {
      varietal_name: 'Pinot Grigio',
    },
    {
      varietal_name: 'Pinot Noir',
    },
    {
      varietal_name: 'Riesling',
    },
    {
      varietal_name: 'Rosé',
    },
    {
      varietal_name: 'Sangiovese',
    },
    {
      varietal_name: 'Sauvignon Blanc',
    },
    {
      varietal_name: 'Syrah',
    },
    {
      varietal_name: 'Viognier',
    },
    {
      varietal_name: 'Zynfandel',
    },
  ];

  await Promise.all(
    varietals.map(varietal =>
      db
        .table('varietals')
        .insert(varietal)
        .returning('id')
        .then(rows =>
          db
            .table('varietals')
            .where('id', '=', rows[0])
            .first('*'),
        )
        .then(row => Object.assign(varietal, row)),
    ),
  );

  const winery = [
    {
      // id: faker.fake("{{random.uuid}}"),
      winery_name: 'Hillside Winery',
      address1: '229 Collier Dr',
      city: 'Sevierville',
      state: 'TN',
      zip_code: '37862',
      phone: '865-908-8482',
      website: 'http://www.hillsidewine.com/',
      avg_rating: null,
      ratings_count: 0,
      latitude: '35.837705',
      longitude: '-83.561110',
      image_url:
        'http://hillsidewine.com/wp-content/uploads/2014/04/Hillside-winerythings-to-do-in-sevierville-tn-Smokymountain-winery-650x300.jpg',
    },
    {
      // id: faker.fake("{{random.uuid}}"),
      winery_name: 'Mill Bridge Winery',
      address1: '3331 S River Rd',
      city: 'Pigeon Forge',
      state: 'TN',
      zip_code: '37863',
      phone: '865-366-1664',
      website: 'http://www.millbridgewinery.com/',
      avg_rating: null,
      ratings_count: 0,
      latitude: '35.788906',
      longitude: '-83.554687',
      image_url: 'http://www.millbridgewinery.com/wp-content/uploads/2017/02/OldMillBlueBottles1.jpg',
    },
    {
      // id: faker.fake("{{random.uuid}}"),
      winery_name: 'Mountain Valley Winery',
      address1: '2174 Parkway',
      city: 'Pigeon Forge',
      state: 'TN',
      zip_code: '37863',
      phone: '865-453-6334',
      website: 'http://www.hogheavenbbq.com/',
      avg_rating: 7,
      ratings_count: 21,
      latitude: '35.818329',
      longitude: '-83.579295',
      image_url: 'http://files.constantcontact.com/525e6cc8201/13f17e5e-95ee-43de-b08a-ae8262ca0eee.jpg',
    },
    {
      // id: faker.fake("{{random.uuid}}"),
      winery_name: 'Sugarland Cellars Winery',
      address1: '1133 Parkway',
      city: 'Pigeon Forge',
      state: 'TN',
      zip_code: '37738',
      phone: '865-325-1110',
      website: 'http://sugarlandcellars.com/',
      avg_rating: 9,
      ratings_count: 5,
      latitude: '35.707204',
      longitude: '-83.522565',
      image_url: 'http://sugarlandcellars.com/wp-content/uploads/2014/03/8-6-2014-5-22-21-PM.jpg',
    },
    {
      // id: faker.fake("{{random.uuid}}"),
      winery_name: 'Arrington Vineyards',
      address1: '6211 Patton Rd',
      city: 'Arrington',
      state: 'TN',
      zip_code: '37014',
      phone: '615-395-0102',
      website: 'http://www.arringtonvineyards.com/',
      avg_rating: 9,
      ratings_count: 5,
      latitude: '35.839911',
      longitude: '-86.695260',
      image_url: 'http://media.arringtonvineyards.com/uploads/page/featured_image/15/Front_Gate_new.jpg',
    },
    {
      // id: faker.fake("{{random.uuid}}"),
      winery_name: 'Beachaven Vineyards & Winery',
      address1: '1100 Dunlop Ln',
      city: 'Clarksville',
      state: 'TN',
      zip_code: '37040',
      phone: '931-645-8867',
      website: 'https://www.beachavenwinery.com/',
      avg_rating: 8,
      ratings_count: 50,
      latitude: '36.578633',
      longitude: '-87.261074',
      image_url:
        'https://scontent-atl3-1.cdninstagram.com/vp/d9d6ad3367354fd276cf97902edbdca8/5C1E8B23/t51.2885-15/sh0.08/e35/p640x640/38636626_280784652508151_6325025846637625344_n.jpg',
    },
  ];

  await Promise.all(
    winery.map(location =>
      db
        .table('winery')
        .insert(location)
        .returning('id')
        .then(rows =>
          db
            .table('winery')
            .where('id', '=', rows[0])
            .first('*'),
        )
        .then(row => Object.assign(location, row)),
    ),
  );

  const wines = [
    {
      wine_name: 'Chardonnay',
      vintage: '2016',
      wine_type: 'Dry White Wine',
      abv_percent: '14.1',
      wine_label_url: 'http://www.hillsidewine.com/',
      description:
        'Tasting Notes: Aromas of nectarine and orange blossom are followed by flavors of lemon drop, poached pear and baked apple tart. Winemaker Notes: Fermented in French oak barrels for a rich, creamy flavor, this wine was then barrel aged an additional five months to create the classic American Chardonnay experience. Elegant and refined, loaded with flavor and a nice smooth finish.',
      avg_rating: null,
      ratings_count: 0,
      user_rating: null,
      winery_id:
        winery[
          faker.random.number({
            min: 0,
            max: winery.length - 1,
          })
        ].id,
    },
    {
      wine_name: 'Firefly Rosé',
      vintage: '2017',
      wine_type: '',
      abv_percent: '',
      wine_label_url: 'http://www.hillsidewine.com/',
      description: '',
      avg_rating: null,
      ratings_count: 0,
      user_rating: null,
      winery_id:
        winery[
          faker.random.number({
            min: 0,
            max: winery.length - 1,
          })
        ].id,
    },
    {
      wine_name: 'Sparkle!',
      vintage: '2016',
      wine_type: 'Sparkling Wine',
      abv_percent: '13',
      wine_label_url: 'http://shop.arringtonvineyards.com/assets/images/wines/originals/Sparkle',
      description:
        'Traditional European sparkling wine methods were used to create this classic sparkling wine. The grapes were picked early to ensure delicate flavors and crisp acidity. The wine was fermented a second time inside each bottle to create the bubbles. Each bottle was aged for additional time, then clarified upside down on wood riddling racks. We hand disgorged each bottle to remove the yeast sediment, then sealed each one by hand with a cork and wire-hood.',
      avg_rating: null,
      ratings_count: 0,
      user_rating: null,
      winery_id:
        winery[
          faker.random.number({
            min: 0,
            max: winery.length - 1,
          })
        ].id,
    },
    {
      wine_name: 'Kinzley Reserve',
      vintage: '2017',
      wine_type: 'Dry White Wine',
      abv_percent: '13,5',
      wine_label_url:
        'http://shop.arringtonvineyards.com/assets/images/wines/originals/Arrington-2017-Kinzley_5624.png',
      description:
        'This Sauvignon Blanc wine was made to be aromatic and flavorful. This Sauvignon Blanc style is meant to be consumed young and not cellar aged. Kinzley was originally named for Kip and his two daughters Mackenzie and Riley. The first vintage of Kinzley Reserve (2013) was a blend of three grapes: Sauvignon Blanc, Albariño and Viognier. Now, we primarily use Sauvignon Blanc to make Kinzley.',
      avg_rating: null,
      ratings_count: 0,
      user_rating: null,
      winery_id:
        winery[
          faker.random.number({
            min: 0,
            max: winery.length - 1,
          })
        ].id,
    },
    {
      wine_name: "Stag's White",
      vintage: '2016',
      wine_type: 'White Wine',
      abv_percent: '13.5',
      wine_label_url:
        'http://shop.arringtonvineyards.com/assets/images/wines/originals/Arrington-2016-Stags-White_4139.png',
      description:
        'Similar in style to Pinot Grigio, we use five fruity grape varieties to make this classic white wine blend. The juice was cold fermented in stainless steel tanks and the wine kept in stainless tanks until bottling. 40% of the grapes used for this wine were grown at Arrington Vineyards. We blended in 7% Muscat Canelli to enhance the juicy white fruit aromas and 5% oak-aged Chardonel to the blend to add a touch of vanilla creaminess to the finish.',
      avg_rating: null,
      ratings_count: 0,
      user_rating: null,
      winery_id:
        winery[
          faker.random.number({
            min: 0,
            max: winery.length - 1,
          })
        ].id,
    },
    {
      wine_name: 'Petite Noir',
      vintage: '2016',
      wine_type: 'Red Wine',
      abv_percent: '13',
      wine_label_url:
        'http://shop.arringtonvineyards.com/assets/images/wines/originals/Arrington-2016-petite-noir_4738.png',
      description:
        'Similar in style to Pinot Noir, this red wine blend was aged for one year in stainless steel tanks fitted with French oak staves. Its flavor is a light bodied balance of smoky oak and red fruits with silky smooth tannins.',
      avg_rating: null,
      ratings_count: 0,
      user_rating: null,
      winery_id:
        winery[
          faker.random.number({
            min: 0,
            max: winery.length - 1,
          })
        ].id,
    },
  ];

  await Promise.all(
    wines.map(wine =>
      db
        .table('wines')
        .insert(wine)
        .returning('id')
        .then(rows =>
          db
            .table('wines')
            .where('id', '=', rows[0])
            .first('*'),
        )
        .then(row => Object.assign(wine, row)),
    ),
  );

  // Create some user comments
  const checkins = Array.from({
    length: 10,
  }).map(() =>
    Object.assign(
      {
        wines_id:
          wines[
            faker.random.number({
              min: 0,
              max: wines.length - 1,
            })
          ].id,
        user_id:
          users[
            faker.random.number({
              min: 0,
              max: users.length - 1,
            })
          ].id,
      },
      (date => ({
        checkin: date,
        created_at: date,
        updated_at: date,
      }))(faker.date.past()),
    ),
  );

  await Promise.all(
    checkins.map(checkin =>
      db
        .table('checkins')
        .insert(checkin)
        .returning('id')
        .then(rows =>
          db
            .table('checkins')
            .where('id', '=', rows[0])
            .first('*'),
        )
        .then(row => Object.assign(checkin, row)),
    ),
  );
};
