import Knex from "knex";

import { Model } from "objection";

const initDB = (config) => {
  const knexInstance = Knex({
    client: "postgresql",
    connection: {
      connectionString: config.databaseUrl,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    },
    migrations: {
      directory: config.databaseMigrationPath,
    },
  });

  Model.knex(knexInstance);

  return knexInstance;
};

export default initDB;
