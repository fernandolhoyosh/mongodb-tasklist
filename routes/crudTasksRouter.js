const {Router} = require('express');
const TaskModel = require('../models/task');

const router = Router();

router.post('/tasks', async (req, res) => {
    const dbConnection = req.dbConnection;
    const { description, completed } = req.body;
    const newTask = new TaskModel({ description, completed });
    try {
      await newTask.save();
      console.log('Se ha creado una nueva tarea');
      res.status(201).json({message: "Tarea agregada correctamente", newTask});
    } catch (err) {
      console.error(err);
      res.status(500).json({message:"Error al insertar el documento", error: err.message});
    } finally {
      if (dbConnection) {
        dbConnection.close();
      }
    }
});

router.get('/tasks', async (req, res) => {
    const dbConnection = req.dbConnection;
    try {
      const documents = await TaskModel.find({});
      console.log('Enviando lista de tareas al cliente');
      res.status(200).json(documents);
    } catch (err) {
      console.log(err);
      res.status(500).json({message:"Error al consultar documentos", error: err.message});
    } finally {
      if (dbConnection) {
        dbConnection.close();
      }
    }
});

router.put('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const dbConnection = req.dbConnection;
    try {
      const deleteTask = await TaskModel.deleteOne({_id:id});
      if (deleteTask.deletedCount >= 1) {
        res.status(200).json({message:"Tarea eliminada correctamente", deleteTask});
      } else {
        res.status(200).json({message:"id de tarea no encontrado"});
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({message:"Error al eliminar la tarea", error: err.message})
    }finally{
      if (dbConnection) {
        dbConnection.close();
      }
    }
});

module.exports = router;