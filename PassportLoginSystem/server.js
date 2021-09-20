////////////////////
// server side js //
////////////////////

console.log('Server restarted')

// variables
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

// --- instead of DB, only variable (on reset, array empty ofc)
const users = []

// for that dependency and use ejs in template
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false})) // take forms and access them inside post method

// ROUTES //
// setup a route, you need to be logged in
app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Kyle' })
})

// ------- Login stuff
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/login', (req, res) => {

})

// ------- Registration stuff
app.get('/register', (req, res) => {
    res.render('register.ejs')
})
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})

// OTHER CODE
// code running
app.listen(3000)