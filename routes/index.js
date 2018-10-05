const fs = require('fs')
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  const usersFile = './mock/db/articles.json'

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) throw err

    res.render('articles', {articles: JSON.parse(data)})
  })
});

module.exports = router;
