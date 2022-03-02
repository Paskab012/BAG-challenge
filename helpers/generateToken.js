import jwt from 'jsonwebtoken';
import 'dotenv/config';

const token = (payload) => {
  const generate = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: '1day',
  });
  return {
    generate,
  };
};

export default token;
