const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoibms3NyIsImEiOiJjbGtuY2NmajYwcWVlM2VwY2psbzBhOXQ5In0.UOpESQ4WyqTySN5qyKB-qQ&limit=1'
    //fix url link when you actually get the geocode api

    request({url, json: true}, (error, {body}) => {//shorthand syntax for url: url, destructure response and take body property
        if (error) {
            callback('Unable to connect to location services!', undefined) //undefined is passed implicity so it's not necessary to put
        }
        else if (body.features.length == 0) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode