const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use("/img", express.static(path.join(__dirname, "img")));
app.use(cors());

app.get("/api/images", (req, res) => {
    const imgDir = path.join(__dirname, "img");
    fs.readdir(imgDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read images" });
        }

        const imageUrls = files.map(file => `/img/${file}`);
        res.json(imageUrls);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


