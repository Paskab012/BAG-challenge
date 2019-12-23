import jwt from 'jsonwebtoken';
import 'dotenv/config';

const isAuthenticated = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Access denied, provide the token'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default isAuthenticated;
