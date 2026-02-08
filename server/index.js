import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();

//Routes
import { getHome , getHealth} from "./controllers/health.js";
import { postSignup , postLogin} from "./controllers/auth.js";
import { getTours , postTours , putTours } from "./controllers/tours.js";

//Middleware
import { checkJWT } from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

//health routes
app.get("/", getHome);
app.get("/health", getHealth);

// auth routes
app.post("/signup", postSignup);
app.post("/login", postLogin );

// tours routes
app.post("/tours", checkJWT, postTours );
app.get("/tours", checkJWT, getTours);
app.put("/tours/:id", checkJWT, putTours);

connectDB();
app.listen(PORT, () => {
    console.log(`Serever is running on PORT ${PORT}`);
});