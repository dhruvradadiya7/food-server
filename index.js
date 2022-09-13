const express = require("express");
const app = express();
const authRouter = require("./server/user/authentication");
const recipesRouter = require("./server/recipes/index");
const profileRouter = require("./server/user/profile");
const scripts = require("./server/fetchScripts");
const others = require("./server/others");
const cors = require("cors");

// CORS config
const corsOptions = { origin: '*', credentials: true, optionSuccessStatus: 200 }
app.use(cors(corsOptions))

// JSON Parse Config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Initialize firebase config
require('./server/firebaseConfig')

const port = parseInt(process.env.PORT, 10) || 8080;

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use("/profile", profileRouter);
app.use("/db", scripts);
app.use("/others", others);

app.listen(port, () => console.log(`Server is ready on ${port}!`));
