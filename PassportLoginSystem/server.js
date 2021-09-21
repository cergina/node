if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

////////////////////
// server side js //
////////////////////

console.log('Server restarted')

// variables
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => {
        return users.find(user => user.email === email)
    },
    id => users.find(user => user.id === id))

// --- instead of DB, only variable (on reset, array empty ofc)
const users = []

// for that dependency and use ejs in template
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false})) // take forms and access them inside post method
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// ROUTES //
// setup a route, you need to be logged in
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

// ------- Login stuff
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// ------- Registration stuff
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log('DEBUG VYPIS')
    console.log(users)
    console.log('END OF DEBUG VYPIS')
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

// ------- middleware
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req,res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}
// OTHER CODE
// code running
app.listen(3000)