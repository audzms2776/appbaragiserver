/**
 * Created by TT on 2016-08-17.
 */
const express = require('express');
const app = express();

app.use(express.static('.'));
app.use(express.static('./public'));

const userRouter = require('./router/userRouter');

app.use(userRouter);

app.listen(4000, ()=> {
    console.log('Server 3000 Start');
});