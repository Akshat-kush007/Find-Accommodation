const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const accommodationRoutes = require("./routes/accommodation");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

//Middlewares=====================
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


//DB Connection=====================
connectDB();

//Routes============================
app.get("/",(req,res)=>{
    res.send(`<h1>Server is Running on port: ${PORT}</h1>`)
})
app.use("/auth", authRoutes);
app.use("/accommodation", accommodationRoutes);

//Starting the Server==============
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
