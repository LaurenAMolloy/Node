const express = require("express");

const app = express();
//console.dir(app);

//When we send a request this code runs
//req and res are made by express and passed in
//express takes http req and turns it into an object!
// app.use((req, res) => {
//     console.log("We got a new request!");
//     res.send('<h1>This is my webpage!</h1>')
// })

app.get('/', (req, res) => {
    res.send('This is the homepage!!!')
})

app.get('/r/:subreddit', (req, res) => {
    //console.log(req.params)
    const { subreddit } = req.params
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    //console.log(req.params)
    const { subreddit, postId } = req.params
    res.send(`<h1>Viewing ${postId} the ${subreddit} subreddit</h1>`)
})

app.post('/cats', (req, res) => {
    res.send('POST REQUEST TO /CATS!!!')
})

app.get('/cats', (req, res) => {
    //console.log("cats requested")
    res.send('MEOW!')
})

app.get('/dogs', (req, res) => {
    res.send("Woof")
})

app.get('/search', (req, res) => {
    const { q } = req.query
    res.send(`<h1>Search results for : ${q}</h1>`)
})

//Path for everything!
// app.get(/(.*)/, (req, res) => {
//  res.send(`I don't know that route`)
// })

app.listen(8080, () => {
    console.log("Listening on port 8080")
})

