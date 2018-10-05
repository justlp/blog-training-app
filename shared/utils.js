module.exports = {
  findUser(user, users) {
    return users.find(savedUser => {
      return savedUser.username === user.username
    })
  },
  findUserByID(id, users) {
    return users.find(savedUser => {
      return savedUser.id === Number(id)
    })
  },
  findArticleById(id, articles) {
    return articles.find(savedArticle => {
      return savedArticle.id === Number(id)
    })
  }
}
