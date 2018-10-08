const jsonfile = require('jsonfile')
const express = require('express')
const utils = require('../shared/utils')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('register')
})

router.post('/', (req, res) => {
  const usersOutputFile = './mock/db/users-create.json'

  jsonfile.readFile(usersOutputFile)
  .then(dbUsers => {
    const user = req.body
    const dbUserIndex = dbUsers.findIndex(dbUser => dbUser.username === user.username)

    if (dbUserIndex >= 0) {
      Object.assign(dbUsers[dbUserIndex], user)
    } else {
      dbUsers.push(user)
    }

    return dbUsers
  })
  .then(body => {
    return jsonfile.writeFile(usersOutputFile, body)
  })
  .then(() => {
    res.send(200).end()
  })
  .catch(error => {
    console.log(error)
  })
})

router.delete('/', (req, res) => {
  const usersOutputFile = './mock/db/users-create.json'

  jsonfile.readFile(usersOutputFile)
  .then(dbUsers => {
    const user = req.body
    const dbUserIndex = dbUsers.findIndex(dbUser => dbUser.username === user.username)

    if (dbUserIndex >= 0) {
      dbUsers.splice(dbUserIndex, 1)
    } else {
      throw new Error('failed');
    }

    return dbUsers
  })
  .then(body => {
    return jsonfile.writeFile(usersOutputFile, body)
  })
  .then(() => {
    res.send(200).end()
  })
  .catch(error => {
    console.log(error)
    res.send(500).end()
  })
})


module.exports = router
