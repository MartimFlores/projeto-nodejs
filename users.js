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


app.get('/users', (req, res) =>{
    const pdidi = users;
    res.send(pdidi);
}

);

app.post('/users', (request, response) =>{
     
    if(moneyBalance==null){
        moneyBalance = request.body.balance ;
    response.send("Variavel criada com sucesso " + moneyBalance);
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