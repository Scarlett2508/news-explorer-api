const articleRoutes = require('express').Router();
// const auth = require('../middlewares/auth');
const { getAllArticles, postArticle, deleteArticle } = require('../controllers/articles');

articleRoutes.get('/', getAllArticles);
articleRoutes.post('/', postArticle);
articleRoutes.delete('/:articleId', deleteArticle);

module.exports = articleRoutes;
