const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser"); // Add cookie-parser

const allowedOrigins = [
  "http://localhost:3000", // Front-End Localhost
  "http://localhost:5173",
  "https://gallery-nexus.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["POST", "GET","DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware

const uri = process.env.MONGODB_URI;
/*const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};*/

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use("/", routes);

app.listen(3001, () => {
  console.log(`Server is Working...`);
});
