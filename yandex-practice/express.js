const { config } = require('dotenv');
const express = require('express');
const path = require('path');

const app = express();

config();

const folderPath = path.join(__dirname, 'static')
app.use(express.static(folderPath));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
