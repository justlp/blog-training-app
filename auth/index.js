const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

function authenticationMiddleware () {
  console.log('authenticationMiddleware')
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
}

const user = {
  username: 'test-user',
  id: 1
}

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      findUser(username, function (err, user) {
        // if (err) {
        //   return done(err)
        // }
        // if (!user) {
        //   return done(null, false)
        // }
        // if (password !== user.password ) {
        //   return done(null, false)
        // }
        return done(null, user)
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
   console.log(passport.authenticationMiddleware)
}

module.exports = initPassport
