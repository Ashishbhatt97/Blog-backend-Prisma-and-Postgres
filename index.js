import express from "express";
import routes from "./routes/index.js"


const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



// User Routes
app.use(routes);


// Connecting to server
app.listen(PORT, () => console.log("Hello PORT ", PORT));