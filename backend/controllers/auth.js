const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  const existing_user = await User.find(req.body.email);
  if (existing_user[0].length > 0) { 
    return res.status(200).send({ 'status': 'fail', 'message': 'Email Already Exists' });
  }
  if(!errors.isEmpty())return res.send({"status":"fail","data":errors});
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try 
  {
    const hashedPassword = await bcrypt.hash(password, 12);
    const first_insert = await User.findAll();
    if(first_insert[0].length == 0){
        var role = "1";
    }
    else{
        var role = "2";
    }
    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
      role:role,
    };    
      const result = await User.save(userDetails);
      res.status(201).json({'status':'success','message': 'User registered!' });
}
   catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);

    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
        name:storedUser.name,
        role:storedUser.role,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: storedUser.id,name: storedUser.name,role:storedUser.role});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
