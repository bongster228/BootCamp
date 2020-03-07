const express = require('express');
const PORT = 3000;
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('search');
});

app.get('/results', (req, res) => {
  const searchTerm = req.query.search;
  const url = `http://www.omdbapi.com/?apikey=thewdb&s=${searchTerm}`;

  request(url, (error, response, body) => {
    if (!error && res.statusCode === 200) {
      const data = JSON.parse(body);
      res.render('results', { data });
    }
  });
});

app.listen(PORT, () => {
  console.log('Movie app has started');
});
