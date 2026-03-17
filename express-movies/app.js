const express = require("express");
const app = express();
const movieRouter = require("./routes/movies");
const cors = require("cors");

// Middleware necessari
app.use(cors()); // Serve al frontend di comunicare con il backend
app.use(express.json()); // Serve a leggere i dati JSON inviati al server
app.use(express.static("public")); // Serve le immagini (Inception, Matrix, ecc.)

// La rotta principale che gestisce tutto il comparto film
app.use("/api/movies", movieRouter);

// Avvio del server
app.listen(3000, () => {
  console.log("Server in ascolto su http://localhost:3000");
});
