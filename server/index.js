import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import ImageKit from "@imagekit/nodejs";

dotenv.config();

//Routes
import { getHome, getHealth } from "./controllers/health.js";
import { postSignup, postLogin } from "./controllers/auth.js";
import { getTours, postTours, putTours } from "./controllers/tours.js";

//Middleware
// import { checkJWT } from "./middleware/auth.js";
import { checkJWT } from "./middlewares/jwt.js";

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

//health routes
app.get("/", getHome);
app.get("/health", getHealth);


app.get('/auth', function (req, res) {
    const { token, expire, signature } = client.helper.getAuthenticationParameters();
    res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

// auth routes
app.post("/signup", postSignup);
app.post("/login", postLogin);

// tours routes
app.post("/tours", checkJWT, postTours);
app.get("/tours", checkJWT, getTours);
app.put("/tours/:id", checkJWT, putTours);

connectDB();
app.listen(PORT, () => {
    console.log(`Serever is running on PORT ${PORT}`);
});