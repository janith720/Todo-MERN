
const express = require("express");
const mongoose = require('mongoose')
const todoRoutes = require("./routes/todos");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/todos", todoRoutes);


mongoose.connect(`mongodb://localhost:27017/MERNTodo`)
    .then(() => {
        app.listen(4000, () => {
            console.log("connected to db and listening on port 4000");
          })
    }).catch((error) => {
        console.log(error)
    })


