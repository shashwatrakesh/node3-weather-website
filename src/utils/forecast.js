const request= require('request');

const forecast=(latitude, longitude, callback)=>{
const url= `https://api.darksky.net/forecast/0fbe64ad456348570221cf7ae46f0e5b/${latitude},${longitude}?units=si`;

request({url: url, json:true}, (error, response)=>{
    if(response.body.error){
        callback("Someting went wrong2", undefined)
    }else{
    
    callback(undefined,`${response.body.daily.data[0].summary} ${response.body.currently.temperature}, ${response.body.currently.precipIntensity} `);
}})
}

module.exports={
    forecast: forecast,
}