const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');
const app = express();

const path = require('path');
const {fileURLToPath} = require('url');

//custom dir_name
const filename = __filename
const dirname = path.dirname(filename);

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

//use client in server
app.use(express.static(path.join(dirname, '/client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('you are listening to port : ' , PORT);
    })
}

server()