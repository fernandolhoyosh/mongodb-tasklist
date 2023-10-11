const { Router } = require("express");
const UserModel = require("../models/user");

const router = Router();

router.post("/users", async (req, res) => {
  const dbConnection = req.dbConnection;
  const { dni, username, name, lastName, password } = req.body;
  try {
    const newUser = new UserModel({ dni, username, name, lastName, password });
    await newUser.save();
    console.log('Se ha creado un nuevo usuario');
    res.status(201).json({message: "Usuario creado correctamente", newUser});
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Error al crear el usuario", error: err.message});
  } finally {
    dbConnection && dbConnection.close();
  }
});

router.get("/users", async (req, res) => {
    const dbConnection = req.dbConnection;
    try {
      const documents = await UserModel.find({});
      console.log('Enviando lista de usuarios al cliente');
      res.status(200).json(documents);
    } catch (err) {
      console.log(err);
      res.status(500).json({message:"Error al consultar lista de usuarios", error: err.message});
    } finally {
        dbConnection && dbConnection.close();
    }
});

router.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const {dni, username, name, lastName, password} = req.body;
    const dbConnection = req.dbConnection;
    try {
      const updateUser = await UserModel.updateOne({_id: id},{$set:{dni:dni, username:username, name:name, lastName:lastName, password:password}});
      if (updateUser.modifiedCount >= 1) {
        res.status(200).json({message: "Usuario actualizado correctamente", updateUser});
      } else {
        res.status(400).json({message:"Algo salio mal", error:"datos iguales o invalidos"});
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({message:"Error al actualizar el usuario", error: err.message});
    }finally {
      if (dbConnection) {
        dbConnection.close();
      }
    }
});

router.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const dbConnection = req.dbConnection;
    try {
      const deleteUser = await UserModel.deleteOne({_id:id});
      if (deleteUser.deletedCount >= 1) {
        res.status(200).json({message:"Usuario eliminado correctamente", deleteUser});
      } else {
        res.status(200).json({message:"id de usuario no encontrado"});
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({message:"Error al eliminar el usuario", error: err.message})
    }finally{
        dbConnection && dbConnection.close();
    }
});

module.exports = router;
