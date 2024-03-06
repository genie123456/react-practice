const express = require('express');
const app = express();
const cors = require('cors');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);

app.use(cors());

const db = mysql2.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '1234',
  database        : 'projects'
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
           res.send({username: username});
        }
    });
});

app.listen(8080, () => {
    console.log('Server listening on port 8080..');
});