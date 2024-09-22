// import path from "path";
import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import gameRoutes from "./routes/game.routes.js";
import fillBlanckRoutes from "./routes/fillBlanck.routes.js";
const app = express();
// import { app, server } from "./socket/socket.js";

dotenv.config();

// Middleware for handling CORS POLICY
app.use(cors());


// const __dirname = path.resolve();



const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/fillBlanck", fillBlanckRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });


app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});