const routes = require('express').Router();
const { getAllArticles, postArticle, deleteArticle} = require('../controllers/articles');

routes.get('/', getAllArticles);
routes.post('/', postArticle);
routes.delete('/:articleId', deleteArticle);

module.exports = routes;
