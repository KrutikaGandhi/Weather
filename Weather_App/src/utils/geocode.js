const request = require('request');

const geocode = (address, callback) => {
    address = encodeURIComponent(address);
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiaHpzYWlmZWUiLCJhIjoiY2s4M3A0ZTJ4MDFxNTNlbXJ0eDA1c3dpZiJ9.YXIJKSkZ5iw9Qus87hggQg&limit=1';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to Connect to Location Service!', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        } else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data);
        }
    });
}

module.exports = geocode;