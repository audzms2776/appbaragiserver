/**
 * Created by TT on 2016-08-17.
 */
const express = require('express');
const router = express.Router();
const app = express();
const formidable = require('formidable');
const Boards = require('../model/boards');

router.route('/board/list')
    .get(getBoardList);

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

module.exports = router;