const {
  JWT_SECRET, NODE_ENV, DB_URL,
} = process.env;
module.exports.PORT = process.env.PORT || 3000;
module.exports.DB_URL = NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/newsforsave';
module.exports.PrivateKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret';
