const Contato = require('../models/ContatoModel');
//Renderiza a página inicial com a lista de contatos do usuário logado
exports.index = async (req, res) => {
    const contato = new Contato();
    const contatos = await contato.buscarContatos();
    res.render('index', { contatos });
};
