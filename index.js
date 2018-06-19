'user strict'

const express = require('express')
const mongoose = require('mongoose')
const es6Renderer = require('express-es6-template-engine')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const falist = require('font-awesome-list')
const port = 8080
let db = mongoose.connection
mongoose.connect('mongodb://localhost/user')
let Posts = require('./models/post')
const messanger = require('./routes/messanger')
const profile = require('./routes/user-prof')
const logreg = require('./routes/log-reg')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))





db.on('error', err => {
    throw err
})

db.once('open', () => {
    console.log('MongoDB connected')
})

app.use('/public', express.static(path.join(__dirname, 'public')))
app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/template/test', (req, res) => {
    res.render('test.html', {
        locals: {
            name: {
                father: 'Achiles',
                mother: 'Mimoza',
                icon: 'fa-check'
            },
            surname: 'Hajdini'
        }
    })
})

app.get('/swap', (req, res) => {
    res.sendFile(`${__dirname}/templates/swap.html`)
})

app.get('/', (req, res) => {
    usersession = req.session
    console.log(req.session)
    Posts.find({}, (err, posts) => {
        if (err) throw err
        else
            console.log(posts)
        res.render('home', {
            locals: {
                posts,
                usersession
            }
        })
    })
})

let all_post = Posts.find({}, (err, posts) => {
    if (err) throw err
    else
        return posts
})


// Navigation Bar.

app.get('/nav_bar', (req, res) => {
    res.sendFile(`${__dirname}/templates/nav_bar.html`)
})

app.get('/side_bar', (req, res) => {
    res.sendFile(`${__dirname}/templates/side_bar.html`)
})

app.get('/notifications', (req, res) => {
    res.sendFile(`${__dirname}/templates/notifications.html`)
})

app.get('/settings', (req, res) => {
    res.sendFile(`${__dirname}/templates/settings.html`)
})


app.get('/messages', (req, res) => {
    res.sendFile(`${__dirname}/templates/messages.html`)
})






app.post('/post/:textarea', (req, res) => {
    console.log(req.params.textarea)
    let postt = new Posts()
    postt.post = req.params.textarea
    date = new Date()
    postt.date = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    postt.save(err => {
        if (err) throw err
        else return res.status(200).send(postt)
    })
})

app.get('/delete/post/:id', (req, res) => {

    Posts.remove({
        _id: req.params.id
    }, err => {
        if (err) throw err
        else return res.status(200).send()
    })
})

app.listen(port, () => {
    console.log(`server is on port: ${port}`)
})

app.use('/messanger', messanger)
app.use('/profile', profile)
app.use('/login', logreg)