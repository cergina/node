// db model

const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom') // chceme iba jsdom portion of what is returned
const dompurify = createDomPurify(new JSDOM().window)

const articleSChema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: { // je v db aby netrebalo pocitat nanovo vzdy
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

// anytime we save, update, create, delete
articleSChema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }

    if (this.markdown) {
        // convert markedown to html and sanitize it
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown)) 
    }

    next()
})

module.exports = mongoose.model('Article', articleSChema)
