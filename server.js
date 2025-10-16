require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const {middleware, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
const routes = require('./routes');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(cookieParser());

//conexão com o banco
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(()=>{
        console.log("Conectado com sucesso ao banco de dados");
        app.emit("ok");
    })
    .catch((err)=>{
        console.error("Conexão com o banco de dados falhou " + err);
    });



const sessionOptions = session({
    secret: process.env.SESSIONSECRET,
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash());

app.use(csrf({cookie: true}));
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(middleware);


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(routes);

app.on("ok", ()=>{
    app.listen(3000, ()=>{
    console.log("Servidor online em: http://localhost:3000");
});
})


