const request = require('request');

const places = (coords, callback) => {
    coords = encodeURIComponent(coords);
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ coords +'.json?access_token=pk.eyJ1IjoiaHpzYWlmZWUiLCJhIjoiY2s4M3A0ZTJ4MDFxNTNlbXJ0eDA1c3dpZiJ9.YXIJKSkZ5iw9Qus87hggQg&limit=1';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to Connect to Location Service!', undefined);
        // }else {console.log(body.features[0].place_name)};
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined);
        } else{
            const data = {
                location: body.features[0].place_name
            }
            callback(undefined, data);
        }
    });
}

module.exports = places;