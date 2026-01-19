import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Tour from "./models/Tour.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

const checkJWT = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded JWT :", decoded);
        next();
    } catch (err) {
        return res.json({
            success: false,
            message: "Invalid or missing token",
            data: null,
        });
    }
};

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

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
        name,
        email,
        mobile,
        city,
        country,
        password: encryptedPassword,
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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
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

    if (!existingUser) {
        return res.json({
            success: false,
            message: "User doesn't exist with this email, please sign up",
            data: null,
        });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    existingUser.password = undefined;

    if (isPasswordCorrect) {
        const jwtToken = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );


        return res.json({
            success: true,
            message: "Login successful",
            data: existingUser,
            jwtToken: jwtToken,
        });
    } else {
        return res.json({
            success: false,
            message: "Invalid email or password",
            data: null,
        });
    }
});

app.post("/tours", checkJWT, async (req, res) => {
    const { title, description, cities, startDate, endDate, photos } =
        req.body;

    const newTour = new Tour({
        title,
        description,
        cities,
        startDate,
        endDate,
        photos,
        user: req.user.id,
    });

    try {
        const savedTour = await newTour.save();

        return res.json({
            success: true,
            message: "Tour created successfully",
            data: savedTour,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: `Tour creation failed: ${error.message}`,
            data: null,
        });
    }
});

app.get("/tours", checkJWT, async (req, res) => {
    const tours = await Tour.find({ user: req.user.id }).populate(
        "user",
        "-password"
    );

    return res.json({
        success: true,
        message: "Fetched tours successfully",
        data: tours,
    });
});

connectDB();

app.listen(PORT, () => {
    console.log(`Serever is running on PORT ${PORT}`);
});