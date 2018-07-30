'user strict'

const express = require('express')
const mongoose = require('mongoose')
const es6Renderer = require('express-es6-template-engine')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const falist = require('font-awesome-list')
const port = 8080
const db = mongoose.connection
mongoose.connect('mongodb://localhost/user')
const Posts = require('./models/post')
const messanger = require('./routes/messanger')
const profile = require('./routes/user-prof')
const logreg = require('./routes/log-reg')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const flash = require('express-flash-messages')
const expressValidator = require('express-validator')
const passport = require('passport')
const cookieParser = require('cookie-parser')
app.use(flash())
app.use(expressValidator())
app.use(passport.initialize())
app.use(passport.session())
app.use(expressValidator())


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
// app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'pug')

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

app.get('/blog', (req, res) => {
    res.render('blog.pug')
})

app.get('/swap', (req, res) => {
    res.render('swap.pug')
})

app.get('/', (req, res) => {
    usersession = req.session
    console.log(typeof usersession)
    Posts.find({}, (err, posts) => {
        if (err) throw err
        else
            res.render('home', {
                posts,
                usersession
            })
    })
})

let all_post = Posts.find({}, (err, posts) => {
    if (err) throw err
    else
        return posts
})


// Navigation Bar.

app.get('/settings', (req, res) => {
    res.sendFile(`${__dirname}/templates/settings.html`)
})


app.get('/messages', (req, res) => {
    res.render('messages.pug')
})





app.post('/post/:textarea', (req, res) => {
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