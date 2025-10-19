const Contato = require('../models/ContatoModel')
exports.index = (req, res) => {
  return res.render('contatos', { contato: {} })
}

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body)
    await contato.register()

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(function () {
        return res.redirect(req.get('referer') || '/contatos/index')
      })
      return
    }
    req.flash('success', 'Contato registrado com sucesso.')
    req.session.save(function () {
      return res.redirect(`/contatos/index/${contato.contato._id}`)
    })
  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render('404')
  const contato = await Contato.buscarPorId(req.params.id)
  if (!contato) return res.render('404')
  return res.render('contatos', {
    contato: contato
  })
}

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404')
    const contato = new Contato(req.body)
    await contato.edit(req.params.id)
    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(function () {
        return res.redirect(req.get('referer') || '/contatos/index')
      })
      return
    }
    req.flash('success', 'Contato editado com sucesso.')
    req.session.save(function () {
      return res.redirect(`/contatos/index/${contato.contato._id}`)
    })
  } catch (e) {
    console.log(e)
    res.render('404')
  }
}

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const contato = new Contato();
    await contato.delete(req.params.id);
    if (!contato) return res.render('404');
    req.flash('success', 'Contato deletado com sucesso.');
    req.session.save(()=>{
      res.redirect('/');
    });
  } catch (e) {
    console.error(e)
    res.render('404')
  }
}
