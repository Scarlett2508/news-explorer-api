const articleRoutes = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const { getAllArticles, postArticle, deleteArticle } = require('../controllers/articles');

const validUrl = (link) => {
  if (!validator.isURL(link)) {
    throw new Error('Неправильный формат ссылки');
  }
  return link;
};

articleRoutes.get('/', getAllArticles);

articleRoutes.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validUrl),
    image: Joi.string().required().custom(validUrl),
  }),
}), postArticle);

articleRoutes.delete('/:articleId', celebrate({
  body: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = articleRoutes;
