const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

require("./routes")(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})