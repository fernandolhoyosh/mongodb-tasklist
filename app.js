const express = require("express");
const { validateBdConnect } = require("./middlewares/databaseConnection");
const TaskModel = require("./models/task");
const app = express();
const port = 3000;

app.use(validateBdConnect);
app.use(express.json());

app.post("/tasks", async (req, res) => {
  const dbConnection = req.dbConnection;
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
    console.log('Se ha creado una nueva tarea');
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Error al insertar el documento", error: err.message});
  } finally {
    if (dbConnection) {
      dbConnection.close();
    }
  }
});

app.get("/tasks", async (req, res) => {
  const dbConnection = req.dbConnection;
  try {
    const documents = await TaskModel.find({});
    console.log('Enviando lista de tareas al cliente');
    res.status(200).send(documents);
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"Error al consultar documentos", error: err.message});
  } finally {
    if (dbConnection) {
      dbConnection.close();
    }
  }
});

app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const {description, completed} = req.body;
  const dbConnection = req.dbConnection;
  try {
    const updateTask = await TaskModel.updateOne({_id: id},{$set:{description: description, completed: completed}});
    if (updateTask.modifiedCount >= 1) {
      res.status(200).json({message: "Tarea actualizada correctamente", updateTask})
    } else {
      res.status(400).json({message:"Algo salio mal", error:"datos o formato invalidos"})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"Error al actualizar la tarea", error: err.message})
  }finally {
    if (dbConnection) {
      dbConnection.close();
    }
  }
});

app.delete("/tasks/:id", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server online on port: ${port}`);
});
