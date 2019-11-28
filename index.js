const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hey you are here')
})

const PORT  = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started running on port ${PORT}`));