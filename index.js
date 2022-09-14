import express from 'express';
const app = express();
// import authRouter from './server/user/authentication';
// import recipesRouter from './server/recipes/index.js';
// import profileRouter from "./server/user/profile.js";
// import scripts from "./server/fetchScripts.js";
// import others from './server/others/index.js';
// import cors from 'cors';


// CORS config
// const corsOptions = { origin: '*', credentials: true, optionSuccessStatus: 200 }
// app.use(cors(corsOptions))

// JSON Parse Config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Initialize firebase config
// require('./server/firebaseConfig')

const port = parseInt(process.env.PORT, 10) || 8080;

app.use("/", (req, res) => {
    res.json({ message: "Hello"})
});
// app.use("/auth", authRouter);
// app.use("/recipes", recipesRouter);
// app.use("/profile", profileRouter);
// app.use("/db", scripts);
// app.use("/others", others);

app.listen(port, () => console.log(`Server is ready on ${port}!`));
