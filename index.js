const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { s3Upload, seGet } = require("./s3-upload");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get("/s3/get", async (req, res) => {
  console.log(req.query);
  const file = await seGet(req.query.name);
  return res.status(200).json({ file });
});

app.post("/s3/upload", upload.single("image"), async (req, res) => {
  const file = await s3Upload(req.file);
  return res.status(200).json({ file });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
