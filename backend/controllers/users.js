const User = require('../models/user');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
  .then((user) => {
    if(!user){
      const error = new Error('Erro no servidor');
      error.statusCode = 500;
      throw error;
    }

    res.send({ data: user })
  })
  .catch(next);
}

module.exports.createUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    const error = new Error('Dados Inválidos');
    error.statusCode = 400;
    throw error;
  }

  User.create({
    name,
    email
  })
  .then(user => res.status(201).send({ data: user }))
  .catch(next);
};

module.exports.deleteUser = (req, res) => {
  const { userId } = req.params;

  console.log(userId)

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).send({ message: "That user was not found to be deleted" });
      }
      res.send({ message: "User deleted successfully", data: deletedUser });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error" });
    });
};

module.exports.updateUser = (req, res) => {

  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  )
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send('Server error'))
}
