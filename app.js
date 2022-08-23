const express=require("express");
const { STATUS_CODES } = require("http");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
    

})
app.post("/",function(req,res)
{
    // res.send("Thanks for posting");
    const query=req.body.cityname;
    const APIkey="e73d31425df853d3abb15be5bd2f739e";
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+APIkey+"&units="+units;
    https.get(url,function(response)
    {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDesc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            console.log(icon);
            const iconurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather in "+query+" is "+weatherDesc+"</p>");
            res.write("<h1>The temperature in"+ query +"is "+temp+" degrees</h1>");
            res.write("<img src="+iconurl+">");
            res.send();
        })
    })
})

app.listen(3000,function()
{
    console.log("Server Running");
})