const connection = require("../data/db");

// INDEX: Recupera tutti i film
const index = (req, res) => {
  const sql = "SELECT * FROM movies";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
};

// SHOW: Recupera un singolo film con le sue recensioni
const show = (req, res) => {
  const { id } = req.params;
  const movieSql = "SELECT * FROM movies WHERE id = ?";
  const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (movieResults.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    const movie = movieResults[0];

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      movie.reviews = reviewsResults;
      res.json(movie);
    });
  });
};

// STORE REVIEW: Salva una nuova recensione nel DB (MILESTONE 1)
const storeReview = (req, res) => {
  // Recuperiamo l'id del film dall'URL
  const { id } = req.params;
  // Recuperiamo i dati della recensione
  const { name, vote, text } = req.body;

  // Query SQL per l'inserimento
  const sql =
    "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";

  connection.query(sql, [id, name, vote, text], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Errore nel salvataggio della recensione" });
    }
    // Rispondiamo con successo e l'id della nuova recensione
    res.status(201).json({
      message: "Recensione aggiunta con successo",
      id: results.insertId,
    });
  });
};

module.exports = { index, show, storeReview };
