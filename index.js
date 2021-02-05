const http = require("http");

const fs = require("fs");
const requests = require("requests");
const homeFile =fs.readFileSync("index.html" , "utf-8");


const replaceVal=(tempVal,orgVal)=>{
    var sunrise_sec = orgVal.sys.sunrise;
    var sunrise_date = new Date(sunrise_sec * 1000);
    var sunrise_timestr = sunrise_date.toLocaleTimeString();
    var sunrise=sunrise_timestr+sunrise_date;
    var sunset_sec = orgVal.sys.sunset;
    var sunset_date = new Date(sunset_sec * 1000);
    var sunset_timestr = sunset_date.toLocaleTimeString();
    var sunset=sunset_timestr+sunset_date;
    var date = orgVal.dt;
    var d_date = new Date(date * 1000);
    // console.log(date, timestr);
    let temperature =tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    temperature = temperature.replace("{%sunrise%}",sunrise);
    temperature = temperature.replace("{%sunset%}", sunset);
    temperature = temperature.replace("{%date%}", d_date);
    return temperature;
};

const server = http.createServer((req,res) => {
    if(req.url=='/'){
        requests('http://api.openweathermap.org/data/2.5/weather?q=Dhenkanal&units=metric&appid=3f26b441896e4aca52b12e3cc4ce4ad6')
            .on('data', function (chunk) {
                const objData = JSON.parse(chunk);
                const arrData =[objData];
            // console.log(arrData[0].main.temp);
            const realTimeData =arrData
            .map((val)=>replaceVal(homeFile,val))
            .join("");
            // console.log(realTimeData);
            res.write(realTimeData);
            })
            .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            
            // console.log('end');
            res.end();
            });
    }
});


server.listen(3000);
// api.openweathermap.org/data/2.5/weather?q=Dhenkanal&appid=3f26b441896e4aca52b12e3cc4ce4ad6

// api
// http://api.openweathermap.org/data/2.5/weather?q=Dhenkanal&units=metric&appid=3f26b441896e4aca52b12e3cc4ce4ad6

// data from openweatherapi
// {"coord":{"lon":85.6,"lat":20.6667},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":21,"feels_like":20.52,"temp_min":21,"temp_max":21,"pressure":1014,"humidity":56},"visibility":3500,"wind":{"speed":1.52,"deg":173},"clouds":{"all":1},"dt":1612543124,"sys":{"type":1,"id":9113,"country":"IN","sunrise":1612486357,"sunset":1612527035},"timezone":19800,"id":1272780,"name":"Dhenkānāl","cod":200}