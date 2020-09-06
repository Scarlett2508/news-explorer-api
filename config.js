const {
  JWT_SECRET, NODE_ENV, DB_URL,
} = process.env;
module.exports.PORT = process.env.PORT || 3000;
// module.exports.DB_URL = NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/newsforsave';
module.exports.DB_URL = NODE_ENV === 'production' ? DB_URL : 'mongodb+srv://Alevtina:aliaalia1997@news.makpo.mongodb.net/newsforsave?retryWrites=true&w=majority';
module.exports.PrivateKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret';


// mongodb+srv://Alevtina:<password>@news.makpo.mongodb.net/<dbname>?retryWrites=true&w=majority