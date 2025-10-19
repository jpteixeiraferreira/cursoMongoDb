const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false },
  email: { type: String, required: false },
  telefone: { type: String, required: false },
  criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
  constructor (body) {
    this.body = body
    this.errors = []
    this.contato = null
  }

  async register () {
    this.validate()
    if (this.errors.length > 0) return
    this.contato = await ContatoModel.create(this.body)
  }
  validate () {
    this.cleanUp()

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.telefone) this.errors.push('Ao menos um email ou um telefone devem ser informados.');


  }

  cleanUp () {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone
    }
  }
  static async buscarPorId(id){
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
  }
}

module.exports = Contato
