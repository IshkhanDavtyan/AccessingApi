const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/72e7545778202f173095b8ab71a591a1/'+lat+','+long;
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connecrion')
        } else if (body.error){
            callback('Unable to find location')
        } else{
            callback(undefined,{
                timezone:body.timezone,
                forecast:body.currently.summary
            })
        }
    })
    }

    module.exports = forecast