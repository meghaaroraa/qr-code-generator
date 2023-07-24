const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const qr = require("qr-image");
const fs = require("fs");
const qr = require("qrcode");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index")
});

app.post("/code", function(req, res){
    const url = req.body.url;

    if(url.length === 0){
        res.render("error");
    }

    qr.toDataURL(url, (err, imageSource) => {
        // src is the source to qrcode image
        if (err) console.log("Error occurred");
        else {
          // rendering qrcode.ejs file and also sending the source to the qrcode as parameter
          res.render("code", { imageSource });
        }
      });

    fs.writeFile("url.txt", url, (err) => {
        if (err) throw err;
        console.log("file has been saved");
    })
})

app.post("/error", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("server started on port 3000");
});