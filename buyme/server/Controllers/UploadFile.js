import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import storage from "../config/firebaseStorange.js";

const Uploadrouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

Uploadrouter.post("/", upload.single("file"), async (req, res) => {
  try {
    // get file
    const file = req.file;
    // create new filename
    if (file) {
      const filename = `${uuidv4()}${path.extname(file.originalname)}`;

      const blob = storage.file(filename);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });
      // if error
      blobStream.on("error", (error) => {
        res.status(400).json({ error });
      });
      // if success
      blobStream.on("finish", async () => {
        // Tạo URL signed cho file
        const [url] = await blob.getSignedUrl({
          action: "read",
          expires: "03-01-2500", // URL không hết hạn trong thời gian dài
        });

        // trả về URL đúng
        res.status(200).json(url);
      });
      blobStream.end(file.buffer);
    } else {
      res.status(400).json("file not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default Uploadrouter;
