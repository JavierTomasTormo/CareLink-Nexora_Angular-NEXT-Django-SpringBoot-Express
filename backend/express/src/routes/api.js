const express = require("express");
const router = express.Router();

// Define your routes here
router.get("/", (req, res) => {
    res.send("API is working");
});

module.exports = router;

// const express = require("express");
// const router = express.Router();

// // Ejemplo de ruta básica
// router.get("/", (req, res) => {
//     res.json({ message: "Welcome to the API!" });
// });

// module.exports = router;
