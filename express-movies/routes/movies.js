const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Rotta per la lista film
router.get("/", movieController.index);

// Rotta per il dettaglio film
router.get("/:id", movieController.show);

// MILESTONE 1: Rotta POST per salvare una recensione specifica per un film
// L'indirizzo sarà: POST http://localhost:3000/api/movies/:id/reviews
router.post("/:id/reviews", movieController.storeReview);

module.exports = router;
