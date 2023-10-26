const db = require('./index');

async function createTables() {
  await db.query(`
  CREATE TABLE IF NOT EXISTS categories (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL
    )
    `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      name VARCHAR NOT NULL,
      email VARCHAR UNIQUE,
      phone VARCHAR,
      category_id UUID,
      FOREIGN KEY(category_id) REFERENCES categories(id)
      )
  `);
}

async function seed() {
  await db.query(`
    INSERT INTO categories(name) VALUES('DISCORD')
  `);

  await db.query(`
    INSERT INTO categories(name) VALUES('ESCOLA')
  `);

  await db.query(`
    INSERT INTO categories(name) VALUES('LINKEDIN')
  `);

  await db.query(`
    INSERT INTO categories(name) VALUES('TRABALHO')
  `);

  await db.query(`
    INSERT INTO categories(name) VALUES('AMIGOS')
  `);
}

await createTables();
await seed();
