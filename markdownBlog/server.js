const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method')) // toto sposobi ze ked dame _delete tak budeme vediet pouzit delete router bez toho aby sme boli stuck s GET a POST

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'})
    res.render('articles/index', { articles: articles })
})

//
app.use('/articles', articleRouter)
app.listen(5000)

console.log('Started')