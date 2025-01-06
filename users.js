const express = require ('express');
const app = express();
const path = require('path');
app.use(express.json());


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});


let moneyBalance=null;

const users=[
    {
        id:0,
        first_name:"Jõao",
        last_name:"Oliveira",
        email:"joao@gmail.com"
    
    },

    {
        id:1,
        first_name:"Manel",
        last_name:"Silva",
        email:"Silva@gmail.com"
    },

];


