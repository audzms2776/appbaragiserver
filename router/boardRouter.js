/**
 * Created by TT on 2016-08-17.
 */
const express = require('express');
const router = express.Router();
const app = express();
const formidable = require('formidable');
const Boards = require('../model/boards');

router.route('/board/list')
    .get(getBoardList)
    .post(addBoard);

router.route('/board/list/:board_id')
    .get(getBoardDetail);

function getBoardList(req, res) {

    const type = req.query['type'];

    Boards.sendBoardList(type, (err, result)=> {
        if (err) {
            res.status(500).send({msg: err.message});
            return;
        }

        res.send(result);
    });
}

function getBoardDetail(req, res) {

    const board_id = req.params['board_id'];

    Boards.sendBoardDetail(board_id, (err, result)=> {
        if (err) {
            res.status(500).send({msg: err.message});
            return;
        }

        res.send(result);
    });
}

function addBoard(req, res) {

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.multiples = true;
    form.keepExtensions = true;
    form.parse(req, function (error, fields) {
        if (error) {
            res.status(500).send({msg: error.message});
            return;
        }

        const user_id = fields['user_id'];
        const type = fields['type'];
        const title = fields['title'];
        const promote = fields['promote'];
        const start_time = parseInt(fields['start_time']);
        const end_time = parseInt(fields['end_time']);
        const place = fields['place'];
        const need = fields['need'];
        const other = fields['other'];
        const max = fields['max'];

        Boards.saveBoard(user_id, type, title, promote, start_time, end_time, place, need, other, max, (err, result)=> {
            if (err) {
                res.status(500).send({msg: err.message});
                return;
            }

            res.send(result);
        });
    });
}

module.exports = router;