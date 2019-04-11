const request = require('request')
const accessTokenMap = 'pk.eyJ1IjoibWlzaGFnYXJidXoiLCJhIjoiY2p0eG5senVzMWQzbTN5cXliNXhkMXU4aCJ9.n1cIl5-_FsMxGxqo-K2SJw'

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token='+accessTokenMap
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to mapping services',undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find information for specified location. Please check location and try again',undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode