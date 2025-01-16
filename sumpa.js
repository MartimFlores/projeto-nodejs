const express = require ('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const songs = "songs";
app.use(express.json());



const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'psi_2',
    port: 3306
});

connection.connect((err)=>{
    if (err){
        console.error('Erro ao conectar à base de dados:', err.message);
    } else {
        console.log('Conectado à base de dados MySQL!');
    }
});
app.get('/songs', (req, res) =>{
    const myQuery = `SELECT * FROM ${songs}`
    connection.query(myQuery, (err, results) => {
        if (err){
            return results.status(500).send('Erro ao buscar users: '+ err.message);
        }
        res.json(results);
    });
}

);

app.post('/songs', (request, response) =>{
    var id = 'NULL';
    var title = request.body.title;
    var artist = request.body.artist;
    var album = request.body.album;
    var genre = request.body.genre;
    var duration_seconds = request.body.duration_seconds;
    var release_date = request.body.release_date;
    var likes = request.body.likes;

    const myQuery2 = `INSERT INTO '${songs}'('id', 'title', 'artist', 'album', 'genre', 'duration_seconds', 'release_date', 'likes', 'created_at') VALUES ('', '${title}','${artist}','${album}','${genre}','${duration_seconds}','${release_date}','${likes}','');`

    connection.query(myQuery2, (err, results) => {
        if (err){
            return response.status(500).send('Erro ao buscar users: '+ err.message);
        }
        response.json(results);
    });
});

app.put('/songs/:id', (request, response) =>{
    var id = request.params.id;
    var title = request.body.title;
    var artist = request.body.artist;
    var album = request.body.album;
    var genre = request.body.genre;
    var duration_seconds = request.body.duration_seconds;
    var release_date = request.body.release_date;
    var likes = request.body.likes;

    const myQuery2 = `UPDATE ${songs} SET title='${title}', artist='${artist}', album='${album}', genre='${genre}', duration_seconds='${duration_seconds}', release_date='${release_date}', likes='${likes}' WHERE id=${id}`

    connection.query(myQuery2, (err, results) => {
        if (err){
            return response.status(500).send('Erro ao buscar users: '+ err.message);
        }
        response.json(results);
    });
});

app.delete('/songs/:id', (request, response) =>{
    var id = request.params.id;

    const myQuery2 = `DELETE FROM ${songs} WHERE id=${id}`

    connection.query(myQuery2, (err, results) => {
        if (err){
            return response.status(500).send('Erro ao buscar users: '+ err.message);
        }
        response.json(results);
    });
});

app.get('/users/:first_name', (req, res) =>{
    const nome = req.params.first_name;
    const myQuery = `SELECT * FROM ${songs} WHERE first_name='${nome}'`
    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar users: '+ err.message);
        }
        res.json(results);
    });
}

);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});

/*  codigo para ddos
const url = 'http://google.com'; // Substitua pelo URL desejado
const numRequests = 10; // Número de requisições a serem enviadas

for (let i = 0; i < numRequests; i++) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log(`Request ${i + 1}: Success`);
            } else {
                console.log(`Request ${i + 1}: Failed with status ${response.status}`);
            }
        })
        .catch(error => {
            console.error(`Request ${i + 1}: Error - ${error}`);
        });
}
*/