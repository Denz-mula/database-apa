const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const DB_PATH = path.join(__dirname, "database.json");

app.use(express.json());
app.use(express.static("public"));

app.get("/database", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DB_PATH));
    res.json(data);
});

app.post("/add", (req, res) => {
    const nomor = req.body.nomor;
    const data = JSON.parse(fs.readFileSync(DB_PATH));
    
    if (!data.nomer.includes(nomor)) {
        data.nomer.push(nomor);
        data.aktif.push(nomor); // default aktif
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    }
    
    res.json({ success: true });
});

app.listen(PORT, () => console.log("Server jalan di http://localhost:" + PORT));
