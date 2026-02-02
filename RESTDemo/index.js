const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv } = require('uuid');

//Run this function on every single function
//Runs middelware
//Parses form data
//allows nested objects
app.use(express.urlencoded({ extended: true }))
//parse data from json formats
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
//When I render a view use ejs as a template
app.set('view engine', 'ejs')

const comments = [
    {   
        id: uuidv(),
        username: 'Pete',
        comment: 'That is so expensive!'
    },
    { 
        id: uuidv(),
        username: "Alexandra",
        comment: "I love building with my lego sets"
    },
    {   
        id: uuidv(),
        username: "Florence",
        comment: "My favourite food is chocolate spread sandwiches"
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

//We need a form route
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({ username, comment, id: uuidv() })
    //Thanks for the data now make a GET request for the comments
    //This causes a new GET to comments and displays the new list
    res.redirect('/comments')
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === (id));
    res.render('comments/show', { comment })
})

app.patch('/comments/:id', (req, res) => {
    //TAKING THE ID FROM THE URL
    const { id } = req.params;
    //Take the PAYLOAD
    const newCommentText = req.body.comment;
    //Find a comment with the id
    const foundCommentText = comments.find(c => c.id === id)
    //Update comment with req.body
    foundCommentText.comment = newCommentText;
    //Redirect
    res.redirect('/comments')
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    //find comment based on id
    const comment = comments.find(c => c.id === id)
    //render form
    res.render('comments/edit', { comment })
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Here are your ${qty} ${meat} taco's`)
})

app.listen(8000, () => {
    console.log("ON PORT 8000")
})

//This is the base
