import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { authRoutes, fileRoutes, shareRoutes } from "./routes";
import connectDB from "./config/database";
import { authenticateToken } from "./middleware/authenticate";
import cors from "./config/corsOptions";
import path from "path";

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Use CORS with custom options
app.use(cors);

// Serve files from the 'uploads' folder at the '/uploads' URL path
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/auth", authRoutes);
app.use("/api/files", authenticateToken, fileRoutes);
app.use("/api/share", shareRoutes);

app.get("/ping", (req, res) => {
  res.send("Pong");
});

// Connect to the database
connectDB()
  .then(() => {
    // Start the server only after a successful database connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
