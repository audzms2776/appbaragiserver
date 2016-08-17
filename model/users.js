/**
 * Created by TT on 2016-08-18.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://175.126.112.98:27017/appba';
var ObjectID = require('mongodb').ObjectID;
const async = require('async');
var db;

function Users() {

}

MongoClient.connect(url, function (err, database) {
    if (err) {
        console.error('MongoDB 연결 실패', err);
        return;
    }

    db = database;
});


module.exports = Users;