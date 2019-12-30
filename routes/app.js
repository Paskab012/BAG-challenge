import express from 'express';
import users from './api/users';
import profile from './api/profile';
import category from './api/category';
import products from './api/products';

// Initilise the app

const app = express();

// Router configuration

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/category', category);
app.use('/api/products', products);

export default app;
