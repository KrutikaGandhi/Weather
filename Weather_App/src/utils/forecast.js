const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/87a374a559f450eb2624a8706e7a1e85/'+ latitude + ','  + longitude + '?units=si';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to Connect to Weather Service!', undefined);
        } else if(body.error){
            callback(body.error, undefined);
        } else{
            const weatherForecast = body.daily.data[0].summary + ' With a low of ' + body.daily.data[0].temperatureMin + ' and a high of ' + body.daily.data[0].temperatureMax + '. Currently it is ' + body.currently.temperature + ' degree celsius out. There is ' + body.currently.precipProbability + ' % chance of rain.';
            callback(undefined, weatherForecast);
        }
    });
}

module.exports = forecast;