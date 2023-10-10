const connectDB = require('../data/database');

const validateBdConnect = async (req, res, next) => {
    try {
        const connection = await connectDB();
        req.dbConnection = connection;
        console.log("Database connection successful");
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error connecting to database", error});
    }
}

module.exports = {validateBdConnect}