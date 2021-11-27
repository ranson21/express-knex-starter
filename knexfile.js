// PostgreSQL Connection Settings
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "postgres"
    },
    migrations: {
      tableName: "migrations",
      directory: "src/db/migrations"
    },
    seeds: {
      directory: "src/db/seeds"
    }
  },

  staging: {
    client: "pg",
    connection: {
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      user: "username",
      password: "password",
      ssl: {
        ca: process.env.DB_CA,
        key: process.env.DB_KEY,
        cert: process.env.DB_CERT
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "migrations"
    }
  }
};
