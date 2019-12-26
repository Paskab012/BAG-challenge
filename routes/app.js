import express from 'express';
import users from './api/users';
import profile from './api/profile';

// Initilise the app

const app = express();

// Router configuration

app.use('/api/users', users);
app.use('/api/profile', profile);

export default app;
