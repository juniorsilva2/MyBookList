const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/connect");
dotenv.config();

require("./modules/express");
connectToDatabase();
