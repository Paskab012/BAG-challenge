/* eslint-disable import/prefer-default-export */
import { check } from 'express-validator';

const validateUser = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please password with 6 or more characters').isLength({
    min: 6
  })
];

export { validateUser };
