const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const config = require("config");

const app = express();
connectDB(); //Connect Database

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors({ origin: '*'}));

app.get("/", (req, res) => res.send(`API running`));

//Define API Routes
app.use("/api/message", require("./routes/api/message"));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
