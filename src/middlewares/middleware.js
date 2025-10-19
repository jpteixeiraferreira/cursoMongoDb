//middleware global do express para enviar dados para as views
exports.middleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err){
        return res.render('404');
    }
    next();
};
//middleware para gerar o token csrf para as views que possuem formulários
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}
//evitar acessar páginas protegidas sem estar logado
exports.loginRequired = (req, res, next) =>{
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer login para continuar.');
        return req.session.save(()=>{
           res.redirect('/login/index');
        })
    }
    next();   
}
//evita acessar páginas de login se já estiver logado
exports.isLogged = (req, res, next) =>{
    if(req.session.user){
        req.flash('errors', 'Você já está logado.');
        return req.session.save(()=>{
           res.redirect('/');
        })
    }
    next();
}