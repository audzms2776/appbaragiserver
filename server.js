/**
 * Created by TT on 2016-08-17.
 */
const express = require('express');
const app = express();

app.use(express.static('.'));
app.use(express.static('./public'));

const boardRouter = require('./router/boardRouter');

app.use(boardRouter);

app.listen(4000, ()=> {
    console.log('Server 3000 Start');
});