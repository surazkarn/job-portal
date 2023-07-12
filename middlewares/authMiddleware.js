const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid token.',
      });
    }
  } else {
    return res.status(401).json({
      status: 'fail',
      message: 'Authentication required.',
    });
  }
};

const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Unauthorized access.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server error.',
    });
    console.log(error); 
  }
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
};
