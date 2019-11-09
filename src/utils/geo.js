const request = require('request')

const geocode =(address, callback)=>{
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaXNoa2hhbiIsImEiOiJjazJqOWMzYzExaG00M2JwNWoyNzJiMXB1In0.C78bQ9l1EYU-feEGpLYYIw';
    
    request ({url:url1,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect')
        } else if(body.features.length ===0){
            callback('Unable to find location')
        } else{
            callback(undefined, {
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode