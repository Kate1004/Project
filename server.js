//Підключаємо бібліотеки
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = 8000;

//Клієнтська частина сайту знаходитиметься у папці public
app.use(express.static(__dirname + '/public'));
//Стандарти кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

//MYSQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vivtorok16'
});

var arr = [
    {
        login: "admin",
        pass: "123"
    },
    {
        login: "admin2",
        pass: "123"
    },
    {
        login: "admin3",
        pass: "123"
    }
]

//Авторизація 
app.post('/login-auth', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            if (rows[0].password == req.body.pass) {
                res.status(200).send("welcome");
            } else {
                res.status(200).send("wrong password");
            }
        } else {
            res.status(200).send("wrong login");
        }
    });
});

//Реєстрація
app.post('/login-reg', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            res.status(200).send("Choose another login!");
        } else {
            connection.query('INSERT INTO users SET ?', req.body,
                function (err, result) {
                    if (err) throw err;
                    console.log('user added to database with id: ' + result.insertId);

                }

            );
            res.status(200).send(req.body.login+" registered!");
        }
    });
});

//Завантажити дані авторизованого юзера  
app.post('/user-prof', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
             connection.query('SELECT * FROM userpage  WHERE users_id = ?', rows[0].id,
                function (err, result) {
                    if (err) throw err;
                    res.status(200).send(result);
                }
            );
        } else {
            res.status(200).send("User is undefined");
        }
    });
});

//Змінити пароль
app.post('/login-change', function (req, res) {
    connection.query('UPDATE users SET password = ? WHERE login = ?', [req.body.password, req.body.login],
        function (err) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});

//Видалити юзера
app.post('/login-del', function (req, res) {
    connection.query('DELETE FROM users WHERE login = ?', req.body.login, function (err) {
        if (err) throw err;
        console.log('user deleted id: ' + req.body.id);
    });
    res.sendStatus(200);
});

//Отримати юзерів
app.get('/users', function (req, res) {
    connection.query('SELECT * FROM users', function (err, rows) {
        if (err) throw err;
        console.log('get all itemss, length: ' + rows.length);
        res.status(200).send(rows);
    });
});


//Усі адреси контролюються клієнтським ангуляром
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//Запуск серверу
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
