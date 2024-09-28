import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import QRCode from "qrcode";
 
dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json());

//connection to  database

// Connect to MongoDB
// mongoose
//   .connect(process.env.mongoURL)
//   .then(() => {
//     console.log("DB Connected");
//   })
//   .catch((err) => {
//     console.log("Fail");
//   });
const mongoURL = "mongodb://127.0.0.1:27017/hotel";

// Connect to MongoDB
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("disconnected from MongoDB server");
});

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB error", err);
});

// create schemma
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  clicks: { type: Number, default: 0 },
});

// create model
const Url = mongoose.model("URL", urlSchema);

app.post("/api/short", async (req,res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) res.status(500).json({ error: "Original url required" });

    const shortUrl = nanoid(8);
    const url = new Url({ originalUrl, shortUrl });
    const myUrl = `http://localhost:3001/${shortUrl}`
    const qrCodeImg = await QRCode.toDataURL(myUrl)
    await url.save();

    return res.status(200).json({ message: "URL GEnerated ", shortUrl: myUrl, qrCodeImg });
    // return res.status(200).send("<h1>Hii I am Kiran</h1>")
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/:shortUrl", async (req,res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (url) 
    {
        url.clicks++;
        await url.save();
        return res.redirect(url.originalUrl);
    }
    else{
        return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(3001, () => {
  console.log("server is running on port 3001");
});
