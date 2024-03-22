import express from "express";
import "dotenv/config";
import { connectMongoose } from "./utils/connectMongoose.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/authRouter.js";
import studyDataRouter from "./routes/studyDataRouter.js"
import userRouter from "./routes/userRouter.js";
import bodyParser from 'body-parser';



const PORT = process.env.PORT || 3001;

await connectMongoose();
const app = express();
app.use( cors({
    origin: "http://localhost:5173", // URL unseres Frontends
    credentials: true // erlaube Cookie-Austausch
  }) );

// app.use(express.json());
app.use(express.json({ limit: '5mb' })); // Adjust the limit as needed
app.use( cookieParser() );

app.use(bodyParser.json());

app.use("/", authRouter)
app.use("/", studyDataRouter)
app.use("/", userRouter)


app.listen(PORT, () => {
    console.log(`I am running in port ${PORT}`);
});
