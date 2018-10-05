const fs = require('fs')
const express = require('express')
const utils = require('../shared/utils')

const router = express.Router()

/* GET articles listing. */
router.get('/', (req, res, next) => {
  const usersFile = './mock/db/articles.json'

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) throw err

    res.render('articles', {articles: JSON.parse(data)})
  })
})

/* Create article */
router.post('/', (req, res) => {
  const outputFile = './mock/db/article-create.json'
  const body = JSON.stringify(req.body)

  fs.writeFile(outputFile, body, () => res.end())
})

/* Get article */
router.get('/:id', (req, res) => {
  const usersFile = './mock/db/articles.json'

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) throw err

    const savedArticles = JSON.parse(data)
    const id = req.params.id

    const existedArticle = utils.findArticleById(id, savedArticles)

    existedArticle ? res.render('article', {article: existedArticle}) : res.status(404).send('Sorry, we cannot find that!')
  })
})

/* Get article for editing */
router.get('/:id/edit', (req, res) => { // same as GET /:id
  const usersFile = './mock/db/articles.json'

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) throw err

    const savedUsers = JSON.parse(data)
    const id = req.params.id

    const existedUser = utils.findArticleById(id, savedUsers)

    existedUser ? res.send(existedUser) : res.status(404).send('Sorry, we cannot find that!')
  })
})

/* Edit article */
router.put('/:id/edit', (req, res) => {
  const outputFile = './mock/db/articles-edit.json'
  const body = JSON.stringify(req.body)

  fs.writeFile(outputFile, body, () => res.end())
})

/* Delete article */
router.delete('/:id/edit', (req, res) => {
  const outputFile = './mock/db/articles-edit.json'
  const body = JSON.stringify(req.body)

  fs.writeFile(outputFile, '', () => res.end())
})

module.exports = router
