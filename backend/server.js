import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), '..', 'frontend');
console.log(__dirname);

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import gameRoutes from "./routes/game.routes.js";
import fillBlanckRoutes from "./routes/fillBlanck.routes.js";

const app = express();
dotenv.config();

// Middleware for handling CORS POLICY
app.use(cors({
    origin: ["http://localhost:5173", "https://games-dev-fixx.onrender.com"],
    credentials: true
}));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/fillBlanck", fillBlanckRoutes);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://games-dev-fixx.onrender.com"], 
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Track connected players by URL
let connectedUsersByUrl = {};

io.on('connection', (socket) => {
    const userAuth = {
        id: socket.id,
        username: socket.handshake.query.username,
        url: socket.handshake.query.url // Assuming the URL is passed in the query
    };

    if (!connectedUsersByUrl[userAuth.url]) {
        connectedUsersByUrl[userAuth.url] = [];
    }

    connectedUsersByUrl[userAuth.url].push(userAuth);
    io.emit('userAuthList', connectedUsersByUrl[userAuth.url]);

    socket.on('startGame', (url) => {
        console.log("url", url);
        io.emit('navigate', { url: url });
    });

    socket.on('disconnect', () => {
        connectedUsersByUrl[userAuth.url] = connectedUsersByUrl[userAuth.url].filter(user => user.id !== socket.id);
        io.emit('userAuthList', connectedUsersByUrl[userAuth.url]);
    });
});

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});
