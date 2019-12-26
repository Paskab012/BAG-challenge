/* eslint-disable import/prefer-default-export */
import { check } from 'express-validator';

const validateProfile = [
  check('location', 'location is required')
    .not()
    .isEmpty(),
  check('cardNumber', 'cardNumber is required')
    .not()
    .isEmpty(),
  check('expiryDate', 'expiryDate is required')
    .not()
    .isEmpty(),
  check('cvv', 'cvv is required')
    .not()
    .isEmpty(),
];

export { validateProfile };
