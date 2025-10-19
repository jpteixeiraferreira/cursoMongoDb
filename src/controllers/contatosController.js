const Contato = require('../models/ContatoModel');
exports.index = (req, res) => {
  return res.render('contatos', {contato:{}})
}

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body)
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(function () {
        return res.redirect(req.get('referer') || '/contatos/index')
      })
      return;
    }
    req.flash('success', 'Contato registrado com sucesso.')
    req.session.save(function () {
      return res.redirect(`/contatos/index/${contato.contato._id}`);
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
}

exports.editIndex = async (req, res) => {
  console.log("entrei no editIndex");
    if(!req.params.id) return res.render('404');
    const contato = await Contato.buscarPorId(req.params.id);
    if(!contato) return res.render('404');
    console.log("Cheguei aqui");
  return res.render('contatos', {
    contato: contato
  });
}