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

app.set("view engine", "hbs");

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.get("/", (request, response) => response.sendFile(__dirname + "/index.html"));
app.get("/index.html", (request, response) => response.sendFile(__dirname + "/index.html"));
app.get("/graph.html", (request, response) => response.sendFile(__dirname + "/graph.html"));
app.get("/notes.html", (request, response) => response.sendFile(__dirname + "/notes.html"));
app.get("/form.html", (request, response) => response.sendFile(__dirname + "/form.html"));

app.post("/form.html", upload.single("avatar"), (request, response) => {
    let fileName = `${(new Date()).getTime()}.txt`;
    let data = `${request.body["name"]}\n${request.body["middlename"]}\n${request.body["lastname"]}\n${request.body["email"]}\n${request.body["nickname"]}\n${request.body["password"]}\n${request.body["role"]}\n${request.body["reputation"]}\n${request.body["date"]}`;

    fs.writeFileSync(`${__dirname}/uploads/${fileName}`, data);

    response.render(__dirname + "/result.hbs", {
        file: `/uploads/${fileName}`,
        link: `/uploads/${request.file.filename}`
    });
})

app.listen(8000);