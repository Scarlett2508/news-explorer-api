const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    // .orFail(() => new NotFoundError('There is no such article'))
    // .orFail(() => res.send({ data: [] }))
    .then((articles = []) => res.send({ data: articles }))
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next)
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId).populate('owner')
    .orFail(() => {
      throw new NotFoundError('There is no such article!');
    })
    .select('+owner')
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Forbidden!');
      }
      return Article.deleteOne(article)
        .then(() => res.send({ message: 'Deleted!' }))
        .catch(next);
    })
    .catch(next);
};
