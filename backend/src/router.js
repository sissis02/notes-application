const express = require("express");

const router = express.Router();

// Import auth services for security operations
const { hashPassword } = require("./services/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Import controllers
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const noteControllers = require("./controllers/noteControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);

/* ************************************************************************* */

router.post("/login", authControllers.login);
/* ************************************************************************* */

router.post("/notes", noteControllers.add);
router.get("/notes-by-user/:id", noteControllers.readByUserId);
router.put("/notes/:id", noteControllers.edit);
router.delete("/notes/:id", noteControllers.destroy);

module.exports = router;
