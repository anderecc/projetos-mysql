const express = require('express');
const newsLetter = express.Router();
const connection = require('../../db/db');

newsLetter.post('/', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            error: 'Seu email é necessário para receber as novidades.',
        });
    }
    connection.query(
        'INSERT INTO tb_emails (email) VALUES(?)',
        [email],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar salvar seu email.',
                });
            }
            return res.status(201).json({
                success: 'Você foi cadastrado para receber nossas novidades.',
            });
        }
    );
});

module.exports = newsLetter;
