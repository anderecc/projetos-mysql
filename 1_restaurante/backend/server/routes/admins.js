const express = require('express');
const RedisStore = require('connect-redis').default;
const session = require('express-session');
const { createClient } = require('redis');
const fileUpload = require('express-fileupload');
const connection = require('../../db/db');
const admins = express();
const fs = require('fs');

let redisClient = createClient({ host: '127.0.0.1', port: 6379 });
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
});

admins.use(fileUpload());

// Initialize sesssion storage.
admins.use(
    session({
        store: redisStore,
        resave: true, // required: force lightweight session keep alive (touch)
        saveUninitialized: true, // recommended: only save session when data exists
        secret: 'keyboard cat',
    })
);

admins.use(async (req, res, next) => {
    const admin = req.session.user;
    const login = req.url === '/login';
    if (login) {
        return next();
    }

    if (admin) {
        return next();
    }

    return res.status(401).json({ error: 'Not authorized' });
});

// COUNT REGISTER IN BD
admins.get('/registers', (req, res) => {
    connection.query(
        'SELECT (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts, (SELECT COUNT(*) FROM tb_menus) AS nrmenus, (SELECT COUNT(*) FROM tb_reservations) AS nrreservations, (SELECT COUNT(*) FROM tb_users) AS nrusers;',
        (err, result) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: 'Ocorreu algum erro ao buscar registros.' });
            }
            return res.status(200).json({ success: result });
        }
    );
});

// LOGIN - LOGOUT
admins.get('/login', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ success: req.session.user });
    } else {
        return res.status(401).json({ error: 'Not authorized' });
    }
});

admins.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query(
        'SELECT * FROM tb_users WHERE email = ?;',
        [email],
        (err, result) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: 'Usuário ou senha incorretos.' });
            }

            if (result.length === 0) {
                return res
                    .status(400)
                    .json({ error: 'Usuário ou senha incorretos.' });
            }
            const row = result[0];
            if (row.password !== password) {
                return res
                    .status(400)
                    .json({ error: 'Usuário ou senha incorretos.' });
            }
            const { name, email } = row;

            req.session.user = { name, email };
            req.session.save();

            return res.status(200).json({ success: { name, email } });
        }
    );
});

admins.get('/logout', (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ success: 'LogOut efetuado com sucesso.' });
    } catch (error) {
        res.status(200).json({
            error: 'Ocorreu algum erro ao tentar fazer seu LogOut.',
        });
    }
});

// NEWS LETTER - EMAILS
admins.get('/emails', (req, res) => {
    connection.query(
        'SELECT id,email FROM tb_emails ORDER BY email;',
        (err, result) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: 'Ocorreu algum erro ao buscar emails.' });
            }
            return res.status(200).json({ success: result });
        }
    );
});

admins.delete('/emails/:email', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: 'Parâmetro email é necessário.' });
    }

    connection.query(
        `DELETE FROM tb_emails WHERE email=(?);`,
        [email],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar excluir email.',
                });
            }
            return res.status(200).json({
                success: email + ' foi excluído com sucesso.',
            });
        }
    );
});

// CONTACTS - MESSAGES
admins.get('/contacts', (req, res) => {
    connection.query(
        'SELECT * FROM tb_contacts ORDER BY id;',
        (err, result) => {
            if (err) {
                return res
                    .status(400)
                    .json({ error: 'Ocorreu algum erro ao buscar mensagens.' });
            }
            return res.status(200).json({ success: result });
        }
    );
});

admins.delete('/contacts/:id', (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res
            .status(400)
            .json({ error: 'Id é necessário para excluir mensagem.' });
    }

    connection.query(
        'DELETE FROM tb_contacts WHERE id=(?);',
        [id],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar excluir mensagem.',
                });
            }
            return res
                .status(200)
                .json({ success: 'Mensagem foi excluída com sucesso.' });
        }
    );
});

// MENUS
admins.get('/menus', (req, res) => {
    connection.query('SELECT * FROM tb_menus ORDER BY id;', (err, result) => {
        if (err) {
            return res
                .status(400)
                .json({ error: 'Ocorreu algum erro ao buscar menus.' });
        }
        return res.status(200).json({ success: result });
    });
});

admins.post('/menus', (req, res) => {
    let { title, description, price, photo } = req.body;
    if (!title) {
        return res
            .status(400)
            .json({ error: 'Titulo é necessário para adicionar novo menu.' });
    }
    if (!description) {
        return res.status(400).json({
            error: 'Descrição é necessário para adicionar novo menu.',
        });
    }
    if (!price) {
        return res
            .status(400)
            .json({ error: 'Preço é necessário para adicionar novo menu.' });
    }
    if (!photo) {
        photo = '/images/admin/boxed-bg.jpg';
    }

    connection.query(
        'INSERT INTO tb_menus (title, description, price, photo) VALUES (?,?,?,?);',
        [title, description, price, photo],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar registrar menu.',
                });
            }
            return res
                .status(201)
                .json({ success: 'Menu adicionado com sucesso.' });
        }
    );
});

admins.delete('/menus/:id', (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res
            .status(400)
            .json({ error: 'Id é necessário para excluir menu.' });
    }

    connection.query(
        'DELETE FROM tb_menus WHERE id=(?);',
        [id],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar excluir menu.',
                });
            }

            return res
                .status(200)
                .json({ success: 'Menu foi excluído com sucesso.' });
        }
    );
});

admins.put('/menus/:id', (req, res) => {
    const { id } = req.query;
    let { title, description, price, photo } = req.body;
    if (!title) {
        return res
            .status(400)
            .json({ error: 'Titulo é necessário para adicionar novo menu.' });
    }
    if (!description) {
        return res.status(400).json({
            error: 'Descrição é necessário para adicionar novo menu.',
        });
    }
    if (!price) {
        return res
            .status(400)
            .json({ error: 'Preço é necessário para adicionar novo menu.' });
    }
    if (!photo) {
        photo = '/images/admin/boxed-bg.jpg';
    }

    connection.query(
        'UPDATE tb_menus SET title=(?), description=(?), price=(?), photo=(?) WHERE id=(?);',
        [title, description, price, photo, id],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar atualizar menu.',
                });
            }
            return res
                .status(201)
                .json({ success: 'Menu atualizado com sucesso.' });
        }
    );
});

//IMAGE
admins.post('/uploadImage', (req, res) => {
    const basePath =
        '/home/anderecc/Documentos/Cursos/Curso-js2/restaurante/frontend/public/images/';
    const image = req.files.file;
    const nameUpload = `${Date.now()}-${image.name}`;
    const path = `${basePath}${nameUpload}`;
    try {
        image.mv(path, (err) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar salvar a imagem',
                });
            }

            return res.status(201).json({
                success: `/images/${nameUpload}`,
            });
        });
    } catch (error) {
        return res.status(400).json({
            error: 'Ocorreu algum erro ao tentar salvar a imagem',
        });
    }
});

admins.delete('/deleteImage/:path', (req, res) => {
    const { path } = req.query;
    const allPath = `/home/anderecc/Documentos/Cursos/Curso-js2/restaurante/frontend/public${path}`;
    if (!path) {
        return res
            .status(400)
            .json({ error: 'Caminho é necessário para excluir documento.' });
    }

    try {
        if (fs.existsSync(allPath)) {
            fs.unlink(allPath, (err) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Ocorreu algum erro ao tentar excluir a imagem',
                    });
                }

                return res.status(201).json({
                    success: 'Imagem foi excluída com sucesso.',
                });
            });
        } else {
            return res.status(400).json({
                error: 'Imagem não foi encontrada para excluir',
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: 'Ocorreu algum erro ao tentar excluir a imagem',
        });
    }
});

//RESERVATIONS
admins.get('/reservations/:all', (req, res) => {
    const { from, to, page } = req.query;

    const labels = [];
    const values = [];
    let limit = 10;
    let offset = +page === 1 ? 0 : +page * 10 - 10;

    if (from && to) {
        let reservations = [];
        let count = 0;
        //CONSULTANDO COM DATA DE INICIO E FIM
        return connection.query(
            `SELECT * FROM tb_reservations WHERE date BETWEEN (?) AND (?) ORDER BY date DESC LIMIT ${limit} OFFSET ${offset};`,
            [from, to],
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Ocorreu algum erro ao buscar reservas.',
                    });
                }

                //CONSULTANDO A CONTAGEM DE TODOS OS RESULTADOS COM DATA DE INICIO E FIM
                connection.query(
                    `SELECT COUNT(*) FROM tb_reservations WHERE date BETWEEN (?) AND (?);`,
                    [from, to],
                    (err, resultCount) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'Ocorreu algum erro ao contar reservas.',
                            });
                        }

                        //CONSULTANDO OS DADOS COM DATA DE INICIO E FIM PARA O GRÁFICO, RETORNANDO O TOTAL DE RESERVAS FEITAS NOS MESES REFERENTE A CONSULTA
                        connection.query(
                            `SELECT CONCAT(YEAR(date), '-', MONTH(date)) AS date, COUNT(*) AS total FROM tb_reservations WHERE date BETWEEN (?) AND (?) GROUP BY (CONCAT(YEAR(date), '-', MONTH(date))) ORDER BY date ASC LIMIT ${limit} OFFSET ${offset};`,
                            [from, to],

                            (err, resultGraphics) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: 'Ocorreu algum erro ao buscar dos para o gráfico.',
                                    });
                                }

                                resultGraphics.forEach((item) => {
                                    labels.push(item.date);
                                    values.push(item.total);
                                });
                                count = resultCount;
                                reservations = result;
                                return res.status(200).json({
                                    success: {
                                        reservations,
                                        count,
                                        graphics: { labels, values },
                                    },
                                });
                            }
                        );
                    }
                );
            }
        );
    }
    if (from && !to) {
        //CONSULTANDO APENAS COM DATA DE INICIO
        return connection.query(
            `SELECT * FROM tb_reservations WHERE date BETWEEN (?) AND (?) ORDER BY date DESC LIMIT ${limit} OFFSET ${offset};`,
            [from, from],
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Ocorreu algum erro ao buscar reservas.',
                    });
                }

                //CONSULTANDO A CONTAGEM DE TODOS OS VALORES COM DATA DE INICIO
                connection.query(
                    `SELECT COUNT(*) FROM tb_reservations WHERE date BETWEEN (?) AND (?);`,
                    [from, from],
                    (err, resultCount) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'Ocorreu algum erro ao contar reservas.',
                            });
                        }

                        //CONSULTANDO OS DADOS COM DATA DE INICIO E FIM PARA O GRÁFICO, RETORNANDO O TOTAL DE RESERVAS FEITAS NOS MESES REFERENTE A CONSULTA
                        connection.query(
                            `SELECT CONCAT(YEAR(date), '-', MONTH(date)) AS date, COUNT(*) AS total FROM tb_reservations WHERE date BETWEEN (?) AND (?) GROUP BY (CONCAT(YEAR(date), '-', MONTH(date))) ORDER BY date ASC LIMIT ${limit} OFFSET ${offset};`,
                            [from, from],

                            (err, resultGraphics) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: 'Ocorreu algum erro ao buscar dos para o gráfico.',
                                    });
                                }

                                resultGraphics.forEach((item) => {
                                    labels.push(item.date);
                                    values.push(item.total);
                                });
                                count = resultCount;
                                reservations = result;
                                return res.status(200).json({
                                    success: {
                                        reservations,
                                        count,
                                        graphics: { labels, values },
                                    },
                                });
                            }
                        );
                    }
                );
            }
        );
    }

    //CONSULTANDO DE FORMA ORDENADA E COM PAGINAÇÃO
    return connection.query(
        `SELECT * FROM tb_reservations ORDER BY date DESC LIMIT ${limit} OFFSET ${offset};`,
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao buscar reservas.',
                });
            }

            //CONSULTANDO O TOTAL DE REGISTROS NA TABELA
            connection.query(
                `SELECT COUNT(*) FROM tb_reservations;`,
                (err, resultCount) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Ocorreu algum erro ao contar reservas.',
                        });
                    }

                    //CONSULTANDO DE FORMA ORDENADA E COM PAGINAÇÃO OS DADOS PARA O GRÁFICO, RETORNANDO O NUMERO TOTAL DE RESERVAS FEITAS EM CADA MÊS
                    connection.query(
                        `SELECT CONCAT(YEAR(date), '-', MONTH(date)) AS date, COUNT(*) AS total FROM tb_reservations GROUP BY (CONCAT(YEAR(date), '-', MONTH(date))) ORDER BY date DESC LIMIT ${limit} OFFSET ${offset};`,

                        (err, resultGraphics) => {
                            if (err) {
                                return res.status(400).json({
                                    error: 'Ocorreu algum erro ao buscar dos para o gráfico.',
                                });
                            }

                            resultGraphics.forEach((item) => {
                                labels.push(item.date);
                                values.push(item.total);
                            });
                            count = resultCount;
                            reservations = result;
                            return res.status(200).json({
                                success: {
                                    reservations,
                                    count,
                                    graphics: { labels, values },
                                },
                            });
                        }
                    );
                }
            );
        }
    );
});

admins.put('/reservations/:id', (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({
            error: 'Verificar é necessário para atualizar documento.',
        });
    }
    let { name, email, date, time, people } = req.body;
    if (!name) {
        return res.status(400).json({
            error: 'Titulo é necessário para atualizar reserva.',
        });
    }
    if (!email) {
        return res.status(400).json({
            error: 'Descrição é necessário para atualizar reserva.',
        });
    }
    if (!date) {
        return res
            .status(400)
            .json({ error: 'Preço é necessário para atualizar reserva.' });
    }
    if (!time) {
        return res.status(400).json({
            error: 'Horário é necessário para atualizar reserva.',
        });
    }
    if (!people) {
        return res.status(400).json({
            error: 'Número de pessoas é necessário para atualizar reserva.',
        });
    }

    connection.query(
        'UPDATE tb_reservations SET name=(?), email=(?), date=(?), time=(?), people=(?) WHERE id=(?);',
        [name, email, date.split('').splice(0, 10).join(''), time, people, id],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    err,
                    error: 'Ocorreu algum erro ao tentar atualizar reserva.',
                });
            }
            return res
                .status(201)
                .json({ success: 'Reserva atualizado com sucesso.' });
        }
    );
});

admins.delete('/reservations/:id', (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res
            .status(400)
            .json({ error: 'Id é necessário para excluir reserva.' });
    }

    connection.query(
        'DELETE FROM tb_reservations WHERE id=(?);',
        [id],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar excluir reserva.',
                });
            }

            return res
                .status(200)
                .json({ success: 'Reserva foi excluído com sucesso.' });
        }
    );
});

// USERS - ADMINS
admins.get('/users', (req, res) => {
    connection.query(
        'SELECT * FROM tb_users ORDER BY name;',
        function (err, results) {
            if (err) {
                return res.status(400).json({
                    err,
                    error: 'Ocorreu algum erro ao buscar dados',
                });
            }
            return res.status(200).json({ success: results });
        }
    );
});

admins.delete('/users/:user', (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ error: 'Verificar é necessário.' });
    }

    connection.query(
        'DELETE FROM tb_users WHERE id=(?);',
        [id],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar excluir usuario.',
                });
            }

            return res
                .status(200)
                .json({ success: 'Usuario excluído com sucesso.' });
        }
    );
});

admins.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    // verificar e ja tem algum conta com o mesmo email informado
    if (!name) {
        return res.status(400).json({ error: 'O campo nome é necessário.' });
    }

    if (!email) {
        return res.status(400).json({ error: 'O campo email é necessário.' });
    }

    if (!password) {
        return res.status(400).json({ error: 'O campo senha é necessário.' });
    }

    connection.query(
        'SELECT email FROM tb_users WHERE email=(?)',
        [email],
        (err1, result1) => {
            if (err1) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar registrar usuario.',
                });
            }
            if (result1.length === 0) {
                return connection.query(
                    'INSERT INTO tb_users (name, email, password) VALUES (?,?,?);',
                    [name, email, password],
                    (err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: 'Ocorreu algum erro ao tentar registrar usuario.',
                            });
                        }

                        return res
                            .status(201)
                            .json({ success: 'Usuario criado com sucesso.' });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ error: 'Email já cadastrado para um usuario.' });
            }
        }
    );
});

admins.put('/users/:user', (req, res) => {
    const { id } = req.query;
    const { name, email } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Id é necessário.' });
    }

    if (!name) {
        return res.status(400).json({ error: 'Campo nome é necessário.' });
    }

    if (!email) {
        return res.status(400).json({ error: 'Campo email é necessário.' });
    }

    if (name && email) {
        connection.query(
            'UPDATE tb_users SET name=(?), email=(?) WHERE id=(?);',
            [name, email, id],
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Ocorreu algum erro ao tentar editar usuario.',
                    });
                }

                return res
                    .status(200)
                    .json({ success: 'Usuario editado com sucesso' });
            }
        );
    }
});

admins.put('/users/user/:password', (req, res) => {
    const { id } = req.query;
    const { password, passwordConfirm } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Id é necessário.' });
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: 'Campo nova senha é necessário.' });
    }

    if (!passwordConfirm) {
        return res
            .status(400)
            .json({ error: 'Campo confirmar senha é necessário.' });
    }

    if (password !== passwordConfirm) {
        return res
            .status(400)
            .json({ error: 'As senhas informadas não coincidem.' });
    }

    connection.query(
        'UPDATE tb_users SET password=(?) WHERE id=(?);',
        [password, id],
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: 'Ocorreu algum erro ao tentar editar usuario.',
                });
            }

            return res
                .status(200)
                .json({ success: 'Usuario editado com sucesso' });
        }
    );
});

module.exports = admins;
