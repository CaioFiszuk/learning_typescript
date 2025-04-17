const express = require('express');
const mongoose = require("mongoose");
const app = express();
const usersRoutes = require('./routes/users');

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/users")
.then(()=>{
  console.log("Database is successfully connected");
});

const { PORT = 3000 } = process.env;

app.use('/users', usersRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));