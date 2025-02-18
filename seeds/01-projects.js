exports.seed = async function (knex) {
  await knex("projects").del(); // Clear existing data

  await knex("projects").insert([
    { project_name: "Build API", project_description: "Create an Express API", project_completed: false },
    { project_name: "Setup Database", project_description: "Create tables using Knex", project_completed: true },
  ]);
};

