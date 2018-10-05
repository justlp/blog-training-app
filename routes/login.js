const fs = require('fs')
const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('login');
})

router.post('/', (req, res) => {
  const outputFile = './mock/db/users-create.json'
  const body = JSON.stringify(req.body)

  fs.writeFile(outputFile, body, () => {
    res.redirect('/')
  })
})

module.exports = router
