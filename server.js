require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(()=>{
        console.log("Conectado com sucesso ao banco de dados");
        app.emit("ok");
    })
    .catch((err)=>{
        console.error("Conexão com o banco de dados falhou " + err);
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

app.on("ok", ()=>{
    app.listen(3000, ()=>{
    console.log("Servidor online em: http://localhost:3000");
});
})


