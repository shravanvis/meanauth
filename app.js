const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const router = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const authenticate = require('./middleware/authenticate')
const postRouter = require('./routes/post')
app.use(cors());
const path = require('path')


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req,res)=>{
    res.send('root route working');
})

app.use(express.static(path.join(__dirname, '..dist/frontend')));

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// database connection
const dbURL = 'mongodb://localhost/SocialMediaApp_db';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
const con = mongoose.connection
con.on('error', ()=> console.log('some error in database'));
con.once('open', ()=> console.log('connected'));


// for routes
app.use('/', router);
app.use('/post', authenticate, postRouter);
app.listen(port, ()=>console.log('server is up and running'));