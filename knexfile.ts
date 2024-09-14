import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mssql",
    connection: {
      type: "azure-active-directory-default",
      server: "filipvesel.database.windows.net",
      database: "FlatterDb",
      authentication: {
        type: "azure-active-directory-default"
      },
      options: {
        encrypt: true
      }
    } as any,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
  }

};

export default config;