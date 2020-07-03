const articleRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const { getAllArticles, postArticle, deleteArticle } = require('../controllers/articles');

articleRoutes.get('/articles', auth, getAllArticles);
articleRoutes.post('/articles', postArticle);
articleRoutes.delete('/:articleId', auth, deleteArticle);

module.exports = articleRoutes;
