/**
 * Created by TT on 2016-08-17.
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

    // console.log('MongoDB 연결 성공');
    db = database;
});

Users.sendBoardList = (type, callback)=> {

    db.collection('boards').find({type: type}).toArray((err, docs)=> {
        if (err) {
            callback(null, {message: 'Error'});
            return;
        }

        if (docs == undefined) {
            callback(null, {message: 'Error'});
            return;
        }

        console.log(docs);
        var goal = {
            total: docs.length,
            board_arr: []
        };

        docs.forEach((item)=> {
            var promote = item['promote'];
            var max = item['max'];
            var curNum = item['participants'].length;
            var obj = {
                promote: promote,
                max: max,
                curNum: curNum
            };

            goal['board_arr'].push(obj);
        });

        callback(null, goal);
    });
};

Users.sendBOardDetail = (board_id, callback)=> {

};

module.exports = Users;