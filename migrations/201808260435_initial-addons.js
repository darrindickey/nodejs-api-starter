module.exports.up = async (db) => {
  // seller data
  await db.schema.createTable('seller', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('seller_name', 100);
    table.string('address1', 100);
    table.string('address2', 100);
    table.string('city', 200);
    table.string('state', 200);
    table.string('zip_code', 25);
    table.string('phone', 25);
    table.string('website', 200);
    table.integer('avg_rating', 5);
    table.integer('ratings_count', 10);
    table.string('latitude', 50);
    table.string('longitude', 50);
    table.string('image_url', 200);
    table.string('logo_url', 200);
    table.timestamps(false, true);
  });

  // Winery data
  await db.schema.createTable('winery', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('winery_name', 100);
    table.string('address1', 100);
    table.string('address2', 100);
    table.string('city', 200);
    table.string('state', 200);
    table.string('zip_code', 25);
    table.string('phone', 25);
    table.string('website', 200);
    table.integer('avg_rating', 5);
    table.integer('ratings_count', 10);
    table.string('latitude', 50);
    table.string('longitude', 50);
    table.string('image_url', 200);
    table.string('logo_url', 200);
    table.timestamps(false, true);
  });

  await db.schema.createTable('varietals', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('varietal_name', 100);
    table.timestamps(false, true);
  });

  await db.schema.createTable('tags', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('tag_name', 100);
    table.timestamps(false, true);
  });

  await db.schema.createTable('wines', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.uuid('winery_id').notNullable().references('id').inTable('winery').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('wine_name', 100);
    table.string('vintage', 100);
    table.string('wine_type', 100);
    table.string('serving_type', 200);
    table.string('abv_percent', 200);
    table.string('wine_label_url', 200);
    table.string('description', 500);
    table.integer('avg_rating', 10);
    table.integer('ratings_count', 10);
    table.string('user_rating', 50);
    table.timestamps(false, true);
  });

  await db.schema.createTable('varietals_wines', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.uuid('varietals_id').notNullable().references('id').inTable('varietals').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('wines_id').notNullable().references('id').inTable('wines').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamp('checkin', 50);
    table.timestamps(false, true);
  });

  await db.schema.createTable('tags_wines', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.uuid('tags_id').notNullable().references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('wines_id').notNullable().references('id').inTable('wines').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamp('checkin', 50);
    table.timestamps(false, true);
  });

  await db.schema.createTable('serving_type', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('serving_type_name', 100);
    table.timestamps(false, true);
  });

  await db.schema.createTable('badges', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('badge_name', 100);
    table.string('badge_description', 100);
    table.string('badge_image_url', 200);
    table.integer('badge_level', 10);
    table.timestamps(false, true);
  });

  await db.schema.createTable('checkins', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('wines_id').notNullable().references('id').inTable('wines').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamp('checkin', 50);
    table.timestamps(false, true);
  });

  await db.schema.createTable('ratings_reviews', table => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('wine_id').notNullable().references('id').inTable('winery').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('rating', 10);
    table.timestamps(false, true);
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('ratings_reviews');
  await db.schema.dropTableIfExists('checkins');
  await db.schema.dropTableIfExists('badges');
  await db.schema.dropTableIfExists('serving_type');
  await db.schema.dropTableIfExists('tags_wines');
  await db.schema.dropTableIfExists('varietals_wines');
  await db.schema.dropTableIfExists('wines');
  await db.schema.dropTableIfExists('tags');
  await db.schema.dropTableIfExists('varietals');
  await db.schema.dropTableIfExists('winery');
  await db.schema.dropTableIfExists('seller');
};

module.exports.configuration = {
  transaction: true,
};
