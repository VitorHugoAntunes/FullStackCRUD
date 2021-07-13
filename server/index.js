const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const { json } = require("body-parser");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "cruddatabase",
    port: 3306,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

db.connect(function(err) {
    if (err) {
      console.error('error connecting');
      return;
    }
   
    console.log('Connection: successful');
  });

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM cruddatabase.movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.post("/api/insert", (req, res) => {

  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = "INSERT INTO cruddatabase.movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result, movieName, movieReview)
    res.send(req.body)
  });
});

app.delete('/api/delete/:id', (req, res) => {
  const ID = req.params.id;
  const sqlDelete = "DELETE FROM cruddatabase.movie_reviews WHERE ID = ?";

  db.query(sqlDelete, ID, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send("deleted")
  })
})

app.put('/api/update/:id', (req, res) => {
  const ID = req.params.id;
  const review = req.body.movieReview
  const sqlUpdate = "UPDATE cruddatabase.movie_reviews SET movieReview = ? WHERE ID = ?";

  db.query(sqlUpdate, [review, ID], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(req.body)
  })
})

app.listen(3333, () => {
    console.log("Running server on port 3333")
});