import dotenv from "dotenv";
dotenv.config();

const getHome = (req, res) => {
    res.json({ message: "Welcome to tiny tours" });
};

const getHealth = (req, res) => {
    res.json({ status: "ok" });
}
export { getHome , getHealth};