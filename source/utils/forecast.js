const request = require('request')
const metric = 'si' //sets the degrees to celsius
const log = console.log

const forecast = (latitude, longitude, callback) =>  {
    const url = 'https://api.darksky.net/forecast/eefd480f303d759b59350118da028a75/'+ latitude + ',' + longitude + '?units=' + metric
    request({url, json: true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to weather serivces',undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined,body.daily.data[0].summary +' It is currently ' +body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. ' +body.daily.summary + ' Tomorrow, the forecast is ' + body.daily.data[1].summary + ' with a high of ' + body.daily.data[1].temperatureHigh + '°C.')

        }
    })
}

module.exports = forecast