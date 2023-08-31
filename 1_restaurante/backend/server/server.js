const express = require('express');

const admins = require('./routes/admins');
const menus = require('./routes/menus');
const reservations = require('./routes/reservations');
const contacts = require('./routes/contacts');
const newsLetter = require('./routes/newsLetter');

const app = express();
const port = 3010;

const cors = require('cors');
const corsOrigin = {
    origin: 'http://localhost:5173', //or whatever port your frontend is using
    credentials: true,
    methods: 'OPTIONS, PUT, DELETE, POST, PATCH, GET, HEAD',
};
app.use(cors(corsOrigin));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', admins);
app.use('/api/menus', menus);
app.use('/api/reservations', reservations);
app.use('/api/contacts', contacts);
app.use('/api/newsLetter', newsLetter);

app.listen(port, () => {
    console.log('API running in http://localhost:3010');
});
