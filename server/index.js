import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import User from "./models/user.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({ message: "Welcome to tiny tours" });
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/signup", async (req, res) => {
    const { name, email, mobile, city, country, password } = req.body;

    if (!name) {
        return res.json({
            success: false,
            message: "Name is required",
            data: null,
        });
    }

    if (!email) {
        return res.json({
            success: false,
            message: "Email is required",
            data: null,
        });
    }

    if (!password) {
        return res.json({
            success: false,
            message: "Password is required",
            data: null,
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.json({
            success: false,
            message: "User with this email already exists",
            data: null,
        });
    }

    const newUser = new User({
        name,
        email,
        mobile,
        city,
        country,
        password,
    });

    try {
        const savedUser = await newUser.save();

        return res.json({
            success: true,
            message: "User registered successfully",
            data: savedUser,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: `User registration failed: ${error.message}`,
            data: null,
        });
    }
});

connectDB();

app.listen(PORT, () => {
    console.log(`Serever is running on PORT ${PORT}`);
});