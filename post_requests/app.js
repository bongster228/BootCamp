/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set view engine and setup bodyParser
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const friends = ['Mango', 'David', 'Ford', 'Justin', 'Pierre', 'Shelby'];

// Routes

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/addFriend', (req, res) => {
  const { newFriend } = req.body;
  friends.push(newFriend);
  res.redirect('/friends');
});

app.get('/friends', (req, res) => {
  res.render('friends', { friends });
});

app.listen(port, () => {
  console.log('Port 3000 started');
});
