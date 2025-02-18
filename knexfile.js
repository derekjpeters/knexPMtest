require("dotenv").config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/project_manager.db",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    pool: {
      afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
    },
  },
};

