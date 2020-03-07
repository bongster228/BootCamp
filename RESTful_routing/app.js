/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

const app = express();
const mongoose = require('mongoose');

const PORT = 4000;

// APP CONFIG
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/restful_blog', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

// MONGOOSE / MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// RESTful ROUTES

// INDEX ROUTE
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  Blog.find({}, (err, allBlogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { allBlogs });
    }
  });
});

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
  res.render('new');
});

// CREATE ROUTE
app.post('/blogs', (req, res) => {
  // Create blog
  const { blog } = req.body;
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(blog, (err, newBlog) => {
    if (err) {
      res.render('new');
    } else {
      // Then redirect to index
      res.redirect('/blogs');
    }
  });
});

// SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', { blog: foundBlog });
    }
  });
});

// EDIT ROUTE
app.get('/blogs/:id/edit', (req, res) => {
  const { id } = req.params;
  Blog.findById(id, (err, foundBlog) => {
    if (err) {
      res.render('edit');
    } else {
      res.render('edit', { blog: foundBlog });
    }
  });
});

// UPDATE ROUTE
app.put('/blogs/:id', (req, res) => {
  const { id } = req.params;
  // Sanitize to get rid of any scripts
  req.body.blog.body = req.sanitize(req.body.blog.body);

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect(`/blogs/${id}`);
    }
  });
});

// DESTROY ROUTE
app.delete('/blogs/:id', (req, res) => {
  const { id } = req.params;

  Blog.findByIdAndDelete(id, err => {
    if (err) {
      res.redirect(`/blogs/${id}`);
    } else {
      res.redirect('/blogs');
    }
  });
});

app.listen(PORT, () => {
  console.log('Blog App Server has started!');
});
