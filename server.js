const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 100000, limit: "500mb"}));
app.use(cors());

// import routes
const projectRoutes = require('./routes/project');

// routes
app.use('/project', projectRoutes);

// connect to MongoDB
async function connectMongoDB() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.amtqm.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

app.listen(process.env.PORT, () => {
    connectMongoDB();
    console.log(`Server is running on port ${process.env.PORT}`)
})