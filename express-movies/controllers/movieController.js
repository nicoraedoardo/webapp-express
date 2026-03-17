const connection = require("../db");

// INDEX
function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Errore del database" });

    // Bonus: trasformiamo l'indirizzo dell'immagine in un URL completo
    const movies = results.map((movie) => ({
      ...movie,
      image: `http://localhost:3000/images/${movie.image}`,
    }));

    res.json(movies);
  });
}

module.exports = { index };

// SHOW
function show(req, res) {
  const id = req.params.id;
  const movieSql = "SELECT * FROM movies WHERE id = ?";
  const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

  // Prima query: il film
  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: "Errore del database" });
    if (movieResults.length === 0)
      return res.status(404).json({ error: "Film non trovato" });

    const movie = movieResults[0];

    // Seconda query: le recensioni
    connection.query(reviewsSql, [id], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: "Errore del database" });

      // Aggiungiamo le recensioni all'oggetto film
      movie.reviews = reviewResults;
      res.json(movie);
    });
  });
}

module.exports = { index, show };
