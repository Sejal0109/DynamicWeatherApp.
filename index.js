const http = require("http");
const fs = require("fs");

var requests = require('requests');
const { join } = require("path");

const homeFile = fs.readFileSync("home.html");
const replaceVal = (tempVal, orgVal) =>{
    const objData= JSON.parse(orgVal);
        const arrData = [objData];
    
     let temperature = tempVal.toString().replace((`{%tempval%}`),(arrData[0].main.temp));
     temperature = temperature.toString().replace("{%tempmin%}",arrData[0].main.temp_min);
     temperature = temperature.toString().replace("{%tempmax%}",arrData[0].main.temp_max);
     temperature = temperature.toString().replace("{%city%}",arrData[0].name);
     temperature = temperature.toString().replace("{%country%}",arrData[0].sys.country);
     temperature = temperature.toString().replace("{%status%}",arrData[0].main.temp);
     return temperature;
}
const server = http.createServer((req,res)=> {
    if (req.url == "/"){
            requests('https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=9ba588abe4413cd9bba184fc2d625fa4', )
    .on('data', function (chunk) {
       
            const realTimeData = replaceVal( homeFile, chunk) ;
        
        res.write(realTimeData);
    })
    .on('end', function (err) {
    if (err) return console.log('connection closed due to errors', err);
    
    console.log('end');
    res.end();
    });
    }
});
server.listen(4500, "127.0.0.1");