const express = require ('express');
const app = express();
const path = require('path');

app.use(express.json())

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