/**
 * Created by TT on 2016-08-17.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('.'));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

const boardRouter = require('./router/boardRouter');

app.use(boardRouter);

app.listen(4000, ()=> {
    console.log('Server 3000 Start');
});