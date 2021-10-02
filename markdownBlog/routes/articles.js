const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })

    if (article == null)
        res.redirect('/')

    res.render('articles/show', { article: article} )
})

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

// helper funkcia
function saveArticleAndRedirect(path) {
    // return set of middleware
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
    
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, { article: article})
        }
    }
}


// aby sme v URL nemuseli pouzivat id, budeme pouzivat slug, treba na to importovat
// nove kniznice: marked, slugify



router.post('/', async (req, res, next) => {
    req.article = new Article()
    next() // znamena, ze chod do dalsej funkcie v zozname cize na ten saveArticle...
}, saveArticleAndRedirect('new'))

module.exports = router
