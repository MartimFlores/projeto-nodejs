const express = require ('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const users = "users";
app.use(express.json())

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



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
}); 

app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'sobre.html'));
}); 

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'contacto.html'));
});

app.get('/carros/:marca', (req, res) => {
    const pedido= req.params.marca;
    res.send(`Esta é a página da marca ${pedido}`);
});

app.get('/users/:name/nacionalidade/:pais', (req, res) => {
    const pedido1 = req.params.name;
    const pedido2 = req.params.pais;

    res.send(`Este user chama-se ${pedido1} e é de ${pedido2}`);
});

app.get('/search_users', (req, res) => {
    const nome = req.query.nome;
    const id = req.query.id;
    res.send(`O user com nome ${nome} e id ${id} não foi encontrado!`);
});

app.get('/livros', (req, res) => {

    const livro = req.body;
    console.log(livro)

    res.send(`Foi feito um pedido do livro: ${livro.nome} , autor: ${livro.artista}, do ano: ${livro.ano}`);
});

let moneyBalance = null;

app.get('/balance/:dinheiro', (req, res) =>{
    const djiz = req.params.dinheiro ;
    res.send(`O seu dinheiro é ${djiz}`);
});

app.post('/balance', (request, response) =>{
     
    if(moneyBalance==null){
        moneyBalance = request.body.balance ;
    response.sendsend("Variavel criada com sucesso " + moneyBalance);
}else{
    response.sendsend("Erro ao criar variavel " + moneyBalance);
}
});

app.put('/balance', (request, response) =>{
     
    if(moneyBalance!=null){
        moneyBalance = request.body.balance ;
    response.send("Variavel atualizada com sucesso " + moneyBalance);
}else{
    response.send("Erro ao atualizar variavel " + moneyBalance);
}
});

app.delete('/balance', (request, response) =>{
     
    if(moneyBalance!=null){
        moneyBalance = null;
    response.send("A variavel foi apagada com sucesso " + moneyBalance);
}else{
    response.send("Erro ao apagar variavel " + moneyBalance);
}
});


app.get('/users', (req, res) =>{
    const myQuery = `SELECT * FROM ${users}`
    connection.query(myQuery, (err, results) => {
        if (err){
            return results.status(500).send('Erro ao buscar users: '+ err.message);
        }
        res.json(results);
    });
}

);

app.post('/users', (request, response) =>{
    var id = 'NULL';
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var email = request.body.email;

    const myQuery2 = `INSERT INTO ${users} (id, first_name, last_name, email) VALUES (NULL, '${first_name}', '${last_name}', '${email}');`

    connection.query(myQuery2, (err, results) => {
        if (err){
            return response.status(500).send('Erro ao buscar users: '+ err.message);
        }
        response.json(results);
    });
});

app.put('/users/:id', (request, response) =>{
    var id = request.params.id;
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var email = request.body.email;

    const myQuery2 = `UPDATE ${users} SET first_name='${first_name}', last_name='${last_name}', email='${email}' WHERE id=${id}`

    connection.query(myQuery2, (err, results) => {
        if (err){
            return response.status(500).send('Erro ao buscar users: '+ err.message);
        }
        response.json(results);
    });
});

app.delete('/users/:id', (request, response) =>{
    var id = request.params.id;

    const myQuery2 = `DELETE FROM ${users} WHERE id=${id}`

    connection.query(myQuery2, (err, results) => {
        if (err){
            return response.status(500).send('Erro ao buscar users: '+ err.message);
        }
        response.json(results);
    });
});

app.get('/users/:first_name', (req, res) =>{
    const nome = req.params.first_name;
    const myQuery = `SELECT * FROM ${users} WHERE first_name='${nome}'`
    connection.query(myQuery, (err, results) => {
        if (err){
            return res.status(500).send('Erro ao buscar users: '+ err.message);
        }
        res.json(results);
    });
}

);

app.put('/balance', (request, response) =>{
     
    if(moneyBalance!=null){
        moneyBalance = request.body.balance ;
    response.send("Variavel atualizada com sucesso " + moneyBalance);
}else{
    response.send("Erro ao atualizar variavel " + moneyBalance);
}
});

app.delete('/users', (req, res) =>{
     
   for (let i = 0; i < users.length; i++) {
    const uti = req.body.id;
    
    if(users[i].id==uti){
        users.splice(i,1);
        res.sendStatus(200);
        return;
    }



    
   } res.sendStatus(400);
});



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