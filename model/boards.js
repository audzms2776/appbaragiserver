/**
 * Created by TT on 2016-08-17.
 */
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://175.126.112.98:27017/appba';
var ObjectID = require('mongodb').ObjectID;
const async = require('async');
var db;

function Boards() {

}

MongoClient.connect(url, function (err, database) {
    if (err) {
        console.error('MongoDB 연결 실패', err);
        return;
    }

    db = database;
});

Boards.sendBoardList = (type, callback)=> {

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
            var board_id = item['_id'];
            var promote = item['promote'];
            var max = item['max'];
            var curNum = item['participants'].length;
            var obj = {
                board_id: board_id,
                promote: promote,
                max: max,
                curNum: curNum
            };

            goal['board_arr'].push(obj);
        });

        callback(null, goal);
    });
};

Boards.sendBoardDetail = (board_id, callback)=> {

    db.collection('boards').find({_id: ObjectID(board_id)}).toArray((err, results)=> {

        if (err) {
            callback(null, {message: 'Error'});
            return;
        }

        if (results == undefined) {
            callback(null, {message: 'Error'});
            return;
        }

        results = results[0];
        var register = results['register'];
        delete results['_id'];

        var man_cnt = results['participants'].length;
        results['man_cnt'] = man_cnt;
        delete results['participants'];

        db.collection('users').find({uuid: register}).toArray((error, docs)=> {
            if (error) {
                callback(null, {message: 'Error'});
                return;
            }

            var name = docs[0]['name'];
            var phone = docs[0]['phone'];

            results['name'] = name;
            results['phone'] = phone;

            callback(null, results);
        });
    });
};

Boards.saveBoard = (user_id, type, title, promote, start_time, end_time, place, need, other, max, callback)=> {

    var obj = {
        "register": user_id,
        "type": type,
        "title": title,
        "promote": promote,
        "start_time": start_time,
        "end_time": end_time,
        "place": place,
        "need": need,
        "other": other,
        "participants": [],
        "max": max
    };

    db.collection('boards').insertOne(obj, (err, results)=> {
        if (err) {
            callback(null, {message: 'Fail'});
        }

        callback(null, {message: "success"});
    });
}

Boards.sendInterestList = (user_id, callback)=> {
    db.collection('users').find({uuid: user_id}).toArray((err, result)=> {

        if (err) {
            callback(null, {message: "Fail"});
            return;
        }

        var interest_arr = result[0]['interest'];

        var arr = [];

        interest_arr.forEach((item)=> {

            var obj = {
                type: item
            };

            arr.push(obj);
        });

        db.collection('boards').find({$or: arr}).toArray((err, results)=> {
            if (err) {
                callback(null, {message: "Fail"});
                return;
            }

            results.forEach((item)=> {
                item['cnt'] = item['participants'].length;
                item['board_id'] = item['_id'];
                delete item['_id'];
                delete item['register'];
                delete item['']
                delete item['participants'];
            });

            var obj = {
                total: results.length,
                list: results
            };

            callback(null, obj);
        });
    });
};

Boards.saveJoin = (user_id, board_id, callback)=> {

    db.collection('boards').find({_id: ObjectID(board_id)}).toArray((err, result)=> {
        if (err) {
            callback(null, {message: 'Fail'});
            return;
        }

        var check = 0;
        result[0]['participants'].forEach((item)=> {
            if (item == user_id) {
                check = 1;
            }
        });

        var setting = {_id: ObjectID(board_id)};

        if (check == 1) {
            db.collection('boards').updateOne(setting, {$pull: {"participants": user_id}}, (err, result)=> {

                if (err) {
                    return callback(err, null);
                }

                var obj = {
                    msg: "fail",
                    join: 0
                };

                if (result['result']['ok'] == 1) {
                    obj['msg'] = "success";
                }

                callback(null, obj);
            });
        } else {

            db.collection('boards').updateOne(setting, {$push: {'participants': user_id}}, (err, result)=> {
                if (err) {
                    return callback(err, null);
                }

                var obj = {
                    msg: "fail",
                    join: 1
                };

                if (result['result']['ok'] == 1) {
                    obj['msg'] = "success";
                }

                callback(null, obj);
            });
        }
    });
};

module.exports = Boards;