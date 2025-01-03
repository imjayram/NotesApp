import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to mongoDB");
}).catch((err)=>{
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:["http://localhost:5175"],credentials:true}));

const port = process.env.PORT || 3000

app.listen(port,()=>{
  console.log("Server is running");
});

import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"

app.use("/api/auth",authRouter);
app.use("/api/note",noteRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message || "Internal Server error";

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
})