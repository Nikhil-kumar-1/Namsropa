import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectdb.js";
import router from "./routes/routes.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT

// Middleware
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
));
app.use("/api/v1", router);
// Connect to MongoDB
connectDB();

export default app;