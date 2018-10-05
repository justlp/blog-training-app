const fs = require('fs')
const express = require('express')
const utils = require('../shared/utils')

const router = express.Router()

/* Get users listing. */
router.get('/', (req, res) => {
  const usersFile = './mock/db/users.json'

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) throw err

    res.render('users', {users: JSON.parse(data)})
  })
});

/* Get user */
router.get('/:id', (req, res) => {
  const usersFile = './mock/db/users.json'

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) throw err;

    const savedUsers = JSON.parse(data)
    const id = req.params.id

    const existedUser = utils.findUserByID(id, savedUsers)

    existedUser ? res.render('user', {user: existedUser}) : res.status(404).send('Sorry, we cannot find that!')
  })
})

/* Get user for editing */
router.get('/:id/edit', (req, res) => { // same as GET /:id
  const usersFile = './mock/db/users.json'

  fs.readFile(usersFile, 'utf-8', (err, data) => {
    if (err) throw err;

    const savedUsers = JSON.parse(data)
    const id = req.params.id

    const existedUser = utils.findUserByID(id, savedUsers)

    existedUser ? res.send(existedUser) : res.status(404).send('Sorry, we cannot find that!')
  })
})

/* Edit user */
router.put('/:id/edit', (req, res) => {
  const outputFile = './mock/db/users-edit.json'
  const body = JSON.stringify(req.body)

  fs.writeFile(outputFile, body, () => res.end())
})

/* Delete user */
router.delete('/:id/edit', (req, res) => {
  const outputFile = './mock/db/users-edit.json'
  const body = JSON.stringify(req.body)

  fs.writeFile(outputFile, '', () => res.end())

})

module.exports = router;
