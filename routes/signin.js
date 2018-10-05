const fs = require('fs')
const express = require('express')
const utils = require('../shared/utils')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('signin');
});

router.post('/', (req, res) => {
  const usersFile = './mock/db/users.json'

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) throw err;

    const savedUsers = JSON.parse(data)
    const user = req.body

    const existedUser = utils.findUser(user, savedUsers)

    existedUser ? res.send(existedUser) : res.status(404).send('Sorry, we cannot find that!')
  })
})


module.exports = router;
