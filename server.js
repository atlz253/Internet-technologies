const express = require("express");
const multer = require('multer');
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

        cb(null, `${(new Date()).getTime()}.${extension}`);
    }
});
const upload = multer({ storage: storage });

const app = express();

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.get("/", (request, response) => response.sendFile(__dirname + "/index.html"));
app.get("/index.html", (request, response) => response.sendFile(__dirname + "/index.html"));
app.get("/graph.html", (request, response) => response.sendFile(__dirname + "/graph.html"));
app.get("/notes.html", (request, response) => response.sendFile(__dirname + "/notes.html"));
app.get("/form.html", (request, response) => response.sendFile(__dirname + "/form.html"));

app.post("/form.html/submit", upload.single("avatar"), (request, response) => {
    response.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Результат</title>
    </head>
    <body>
        <a href="/uploads/${request.file.filename}">ссылка</a>
        <img src="/uploads/${request.file.filename}">
    </body>
    </html>`);
})

app.listen(8000);