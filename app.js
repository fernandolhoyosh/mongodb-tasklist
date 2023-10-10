const express = require("express");
require('dotenv').config();
const { validateBdConnect } = require("./middlewares/databaseConnection");

const tasksRouters = require("./routes/crudTasksRouter");
const usersRouters = require("./routes/crudUsersRouter");

const app = express();
const PORT = process.env.PORT_SERVER;

app.use(validateBdConnect);
app.use(express.json());

app.use("/", tasksRouters);
app.use("/", usersRouters);

app.listen(PORT, () => {
  console.log(`Server online on port: ${PORT}`);
});
