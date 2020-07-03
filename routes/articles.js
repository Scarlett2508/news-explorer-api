const articleRoutes = require('express').Router();
// const auth = require('../middlewares/auth');
const { getAllArticles, postArticle, deleteArticle } = require('../controllers/articles');

articleRoutes.get('/articles', getAllArticles);
articleRoutes.post('/articles', postArticle);
articleRoutes.delete('/:articleId', deleteArticle);

module.exports = articleRoutes;
