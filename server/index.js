const express = require('express');
const cors = require('cors');
const app = express();
var env = require('dotenv');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

require('./routes')(app);

app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Listening at ${port}`);
})