const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.get("/country", (req,res)=>{
    const url = "https://countriesnow.space/api/v0.1/countries/";
    https.get(url, (response)=>{
        response.on("data",(data)=>{
            const countriesdata = JSON.parse(data);
            console.log(countriesdata)
            res.send(countriesdata.data);
        })
    })
})

app.post("/",(req,res)=>{
    const countryName=req.body.countryName;
    console.log(countryName);
    const appid="6115a82b9c9cef3fd4d5c82e2677c6e8";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+countryName+"&units=metric&appid="+appid;
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const windDirection = weatherData.wind.deg;
            const windGust = weatherData.wind.gust;

            
            res.write("<h1>The Temperature is "+temp+" degree Celcius</h1>");
            res.write("<h1>The Humidity in "+countryName+"is "+humidity+"%</h1>");
            res.write("<h1>The Wind Speed in "+countryName+"is "+windSpeed+" m/s</h1>");
            res.write("<h1>The Wind Direction in "+countryName+"is "+windDirection+" degrees</h1>");
            res.write("<h1>The Wind Gust in "+countryName+"is "+windGust+" m/s</h1>");
            res.send();
        })
    })
     
})

app.listen(2300,()=>{
    console.log("server is running.")
})