const express = require("express");
const knex = require("knex");
const cors = require("cors");

const db = knex(require("../knexfile").development);

const server = express();
server.use(express.json());
server.use(cors());

// POST /api/projects - Add a new project
server.post("/api/projects", async (req, res) => {
  try {
    const [id] = await db("projects").insert(req.body);
    const newProject = await db("projects").where("project_id", id).first();
    newProject.project_completed = Boolean(newProject.project_completed);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: "Error adding project", error: err.message });
  }
});

// GET /api/projects - Fetch all projects
server.get("/api/projects", async (req, res) => {
  try {
    const projects = await db("projects");
    res.json(projects.map((proj) => ({ 
      ...proj, 
      project_completed: Boolean(proj.project_completed) 
    })));
  } catch (err) {
    res.status(500).json({ message: "Error retrieving projects", error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
