require('dotenv').config()
const express = require('express');
const app = express();
const pug = require('pug');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
app.use(express.static('static'))
//Use Lowdb module
const db = require('./database/db')
// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [], users: []})
  .write()

app.set('view engine', 'pug'),
app.set('views', './client')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(process.env.secretKey))
app.use('/', require('./routes'));


app.listen(PORT, ()=> {
    console.log(`Server start on PORT: ${PORT}`)
})
