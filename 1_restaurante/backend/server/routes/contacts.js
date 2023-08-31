const express = require('express');
const connection = require('../../db/db');
const contacts = express.Router();

contacts.post('/new', (req, res) => {
    const { name, email, message } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Campo "nome" é necessário.' });
    }
    if (!email) {
        return res.status(400).json({ error: 'Campo "email" é necessário.' });
    }
    if (!message) {
        return res
            .status(400)
            .json({ error: 'Campo "mensagem" é necessário.' });
    }

    connection.query(
        'INSERT INTO tb_contacts (name, email, message) VALUES(?,?,?)',
        [name, email, message],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar enviar sua mensagem.',
                });
            }
            return res.status(200).json({
                success: 'Sua mensagem foi enviada com sucesso.',
            });
        }
    );
});

module.exports = contacts;
