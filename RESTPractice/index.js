const express = require('express');
const methodOverride = require('method-override')
const app = express();
const path = require('path');
const { v4: uuidv4 } = require("uuid");

//This allows us to overide post methods in our form
app.use(methodOverride('_method'));

//serve static files
app.use(express.static('public'));

//Middleware
app.use(express.urlencoded({ extended: true }));

//parses data from json formats
app.use(express.json())

//Create an absolute path to views
app.set('views', path.join(__dirname, '/views'))
//We need an engine to run ejs
app.set('view engine', 'ejs');

//Comments array - Make sure each comment has a UUID
let comments = [
    { 
      id: uuidv4(),
      username: "confusedCoder42",
      comment: "Why does console.log work everywhere except where I need it most."
    },
    { 
      id: uuidv4(),
      username: "loopLearner",
      comment: "Spent 40 minutes debugging. Missed a semicolon. Growth."
    },
    { 
      id: uuidv4(),
      username: "expressNoob",
      comment: "I finally understand req and res and now I feel unstoppable."
    },
    { 
      id: uuidv4(),
      username: "cssStruggler",
      comment: "Everything is centered except my life."
    },
    {
      id: uuidv4(),
      username: "stackOverflower",
      comment: "I fixed it. I don’t know why. I’m afraid to touch it."
    },
    {
      id: uuidv4(),
      username: "asyncAnxiety",
      comment: "Promises make sense until they don’t."
    }
  ];

//RESTFUL Routes
// GET /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comment/:id - Destroy one comment


//Create a route to view comments
//Pass and Loop over Comments
//get HTTP method "I want DATA!"
app.get('/comments', (req, res) => {
 res.render('comments/index', { comments })
})

//Create a route to create a comment
//GET
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

//Create a route to post comments
app.post('/comments', (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment, id: uuidv4() });
    //Thanks for the data now let's make a GET request!
    res.redirect('/comments')
    //res.send('IT WORKS')
})


//Create a route to view each comment details
//GET via Search Params
app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    //Find comment that matchs req params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

//Route to show the form
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    //Find comment based on id
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

//Create a route to edit the comments
//PATCH
app.patch('/comments/:id', (req, res) => {
    //TAKING THE ID FROM THE URL
    const { id } = req.params
    //Take the PAYLOAD from the body
    const newText = req.body.comment
    //Find a comment with the id
    const existing = comments.find(c => c.id === id)
    //Update comment with req.body
    existing.comment = newText
    //Redirect
    res.redirect('/comments')
})

//Create Route to Delete
//Filter the comments list
//path /comments/:id 
//Final step!
app.delete('/comments/:id', ( req, res) => {
  //Take id from path
  const { id } = req.params
  //Do not mutate the original
  comments = comments.filter((comment) => {
    return comment.id !== id
  });
  res.redirect('/comments')
})


app.listen('8000', () => {
    console.log("Listening on port 8000")
})