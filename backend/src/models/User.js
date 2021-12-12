const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
      type: String,
      required: true,
  },
  password: {
    type: String,
    required: true,
  }},{
    // Cria as colunas CreatedAt e UpdatedAt no mongoose
    timestamps: true
})


module.exports = model('User', UserSchema);