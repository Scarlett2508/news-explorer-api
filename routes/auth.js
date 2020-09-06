const routes = require('express').Router();

const { Joi, celebrate } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const { validationResult } = require('express-validator');
const userSchema = require('../models/user');
const bcrypt = require('bcrypt')

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), 
createUser);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// routes.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//   }),
// }),
// async (req, res) => {
//   try {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//           return res.status(400).json({
//               errors: errors.array(),
//               message: 'Некорректные данные при входе в систему',
//           });
//       }

//       const {email, password} = req.body;
//       const user = await userSchema.findOne({email})

//       if (!user) {
//           return res.status(400).json({message: 'Пользователь не найден'});
//       }
//       const isMatch = await bcrypt.compare(password, user.password);
      
//       if (!isMatch) {
//           return res.status(400).json({message: 'Неверный пароль'});
//       }
      
//       const token = jwt.sign(
//         {_id: user._id }, PrivateKey, { expiresIn: '7d' },
//       );
//       console.log('after token', token)
//       res.json({token, _id: user._id});
//   } catch (e) {
//       console.error('error', e);
//       res.status(500).json({message: 'Что-то пошло не так'});
//   }
// }, login);


module.exports = routes;

