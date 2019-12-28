/* eslint-disable import/prefer-default-export */
import { check } from 'express-validator';

const validateCategory = [
  check('title', 'location is required')
    .not()
    .isEmpty(),
  check('description', 'description is required')
    .not()
    .isEmpty()
];

export { validateCategory };
