const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(() => new NotFoundError('There is no such article'))
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};
