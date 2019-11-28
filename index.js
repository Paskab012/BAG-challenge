const express = require('express');
const mongoose = require('mongoose')

require('dotenv').config();

//app
const app = express();

//DB connection 

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully!'))

//routes 
app.get('/', (req, res) => {
    res.send('Hey you are here')
})

const PORT  = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started running on port ${PORT}`));