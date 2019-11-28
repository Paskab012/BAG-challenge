const express = require('express');
const mongoose = require('mongoose')

require('dotenv').config();

const userRoutes = require('./routes/users/users');
//app
const app = express();

//DB connection

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully!'))

// routes middleware 

app.use('/api', userRoutes);

const PORT  = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started running on port ${PORT}`));