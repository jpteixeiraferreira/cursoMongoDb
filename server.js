const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectionString = 'mongodb+srv://jpdev:jpdev@cluster0.qjzrob8.mongodb.net/BANCOTESTE?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(connectionString)
    .then(()=>{
        console.log("Conectado com sucesso ao banco de dados");
    })
    .catch((err)=>{
        console.error("Conexão falhou " + err);
    });
const routes = require('./routes');
const path = require('path');
const middleware = require('./src/middlewares/middleware');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//middlewares próprios
app.use(middleware);
app.use(routes);

app.listen(3000, ()=>{
    console.log("Servidor online em: http://localhost:3000");
});

