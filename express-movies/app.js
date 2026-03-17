const express = require("express");
const app = express();
const cors = require("cors");
const movieRouter = require("./routes/movies"); // Importa il router dei film
require("dotenv").config(); // Carica le variabili dal file .env

// Recuperiamo la porta dalle variabili d'ambiente o usiamo la 3000 come default
const port = process.env.PORT || 3000;

// Permette la comunicazione tra frontend e backend (
app.use(cors());

// Permette al server di leggere dati in formato JSON
app.use(express.json());

// BONUS: Serve i file statici (immagini) dalla cartella 'public'
app.use(express.static("public"));

// --- ROTTE ---

// BONUS: Utilizzo del router per tutte le rotte che iniziano con /api/movies
app.use("/api/movies", movieRouter);

// BONUS: Middleware per rotte inesistenti (404)

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: "Not Found",
    message: "La risorsa richiesta non esiste.",
  });
});

// BONUS: Middleware di gestione errori generici (500)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    error: "Internal Server Error",
    message: "Si è verificato un errore interno al server.",
  });
});

// --- AVVIO SERVER ---
app.listen(port, () => {
  console.log(`Server avviato correttamente su http://localhost:${port}`);
});
