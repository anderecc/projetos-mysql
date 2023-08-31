const express = require('express');
const connection = require('../../db/db');
const reservations = express.Router();

reservations.post('/', (req, res) => {
    const { name, email, people, date, time } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Campo "nome" é necessário.' });
    }
    if (!email) {
        return res.status(400).json({ error: 'Campo "email" é necessário.' });
    }
    if (!people) {
        return res.status(400).json({ error: 'Campo "pessoas" é necessário.' });
    }
    if (!date) {
        return res.status(400).json({ error: 'Campo "data" é necessário.' });
    }
    if (!time) {
        return res.status(400).json({ error: 'Campo "hora" é necessário.' });
    }

    connection.query(
        'INSERT INTO tb_reservations (name, email, people, date, time) VALUES(?,?,?,?,?)',
        [name, email, people, date, time],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar efetuar sua reserva.',
                });
            }
            return res.status(200).json({
                success: 'Sua reserva foi aprovada com sucesso.',
            });
        }
    );
});

module.exports = reservations;
