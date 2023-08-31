const express = require('express');
const menus = express.Router();
const connection = require('../../db/db');

menus.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM tb_menus ORDER BY title',
        function (err, results) {
            if (err) {
                return res.status(400).json({
                    err,
                    error: 'Ocorreu algum erro ao buscar dados',
                });
            }
            return res.status(200).json(results);
        }
    );
});

module.exports = menus;
