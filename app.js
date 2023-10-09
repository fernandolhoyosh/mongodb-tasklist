const express = require("express");
const {DateTime} = require('luxon');
const connectDB = require("./data/database");
const TaskModel = require("./models/task");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/tasks", async (req, res) => {
  try {
    await connectDB();
  } catch (error) {
    return res.status(500).send({message:"Error connecting to database", error});
  }

  const { description, completed } = req.body;
  const newTask = new TaskModel({ description, completed });

  try {
    await newTask.save();

   /*  const data = {
        id: newTask.id,
        description: newTask.description,
        completed: newTask.completed,
        createdAt: newTask.createdAt.
      }; */

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor');
  }
});

app.get("/tasks", async (req, res) => {
  let connectionBd;
  try {
     connectionBd = await connectDB();
  } catch (error) {
    return res.status(500).send({message:"Error connecting to database", error});
  }

  try {
    const documents = await TaskModel.find({});
    res.status(200).send(documents);
  } catch (error) {
    console.log(error)
    res.status(500).send("Error al consultar documentos");
  }finally{
    if (connectionBd) {
      connectionBd.close();
    }
  }

});

app.put("/tasks/:id", async (req, res) => {});

app.delete("/tasks/:id", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server online on port: ${port}`);
});
