const User = require('../models/User')

const users = []

module.exports = {
  async index(req, res) {
    // const users = await User.find()
    

    return res.json(users);
  },
  async create(req, res) {
    const { user } = req.body;

    // const userExists = await User.findOne({ user: username })

    // if (userExists) {
    //   return res.json(userExists)
    // }

    // const user = await User.create(user)

    users.push(user)

    return res.json(user)
  }
}