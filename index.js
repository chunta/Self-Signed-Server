const https = require('https');
const http = require('http');
const epxress = require("express");
const app = epxress();

const fs = require("fs");
const bodyParser = require("body-parser");
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/test", function (req, res) {
    res.set('Cache-Control', 'no-store');
    var obj = {"key": 10};
    res.send(JSON.stringify(obj));

});

app.post("/test", function (req, res) {
    res.send("test" + req.body);
});

app.get('/download', (req, res) => {
    const filePath = './cert'; // Path to the file you want to download
    const fileName = 'cert.pem'; // Name of the file as it will appear in the download
    const file = `${__dirname}/cert/cert.pem`;
    res.download(file);
	/*
    res.download(filePath, fileName, (err) => {
        if (err) {
            // Handle error, such as file not found
            res.status(404).send('File not found');
        }
    });
    */
});

const options = {
   key: fs.readFileSync("cert/key.pem", 'utf8'),
   cert: fs.readFileSync("cert/cert.pem", 'utf8')
};


https.createServer(options, app).listen(3000, function (req, res) {
    console.log("Server stated at port 3000");
});

/*
app.listen(8080, () => {
    console.log("start at 8080");
})
*/
/*
http.createServer(function(req, res) {
    res.write('Hello World');
    res.end();
}).listen(8080);*/
