import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;



app.get("/" , (req ,res) => {
    res.json({message: "Welcome to tiny tours"});
});

app.get("/health" , (req ,res) => {
    res.json({status: "ok"});
});

app.listen(PORT , () => {
    console.log(`Serever is running on PORT ${PORT}`)
});