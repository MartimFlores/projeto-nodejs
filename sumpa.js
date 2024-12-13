const express = require ('express');
const app = express();
const path = require('path');

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



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr em https://localhost/:${PORT}`);
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