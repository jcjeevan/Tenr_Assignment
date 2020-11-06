const { validationResult } = require('express-validator');

const Home = require('../models/home');
const User = require('../models/user');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allUsers] = await Home.fetchbyrole();
    res.status(200).send({'data':allUsers,'status':'success','message':'List of users'});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};




