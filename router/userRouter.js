/**
 * Created by TT on 2016-08-17.
 */
const express = require('express');
const router = express.Router();
const app = express();
const formidable = require('formidable');
const Users = require('../model/users');

router.route('/board/list')
    .get(getBoardList);

function getBoardList(req, res) {

    const type = req.query['type'];

    Users.sendBoardList(type, (err, result)=> {
        if (err) {
            res.status(500).send({msg: err.message});
            return;
        }

        res.send(result);
    });
}

module.exports = router;