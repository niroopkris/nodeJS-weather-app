const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=016fb76982f06b22e88ec5a35f863475&query=' + 
    latitude + ',' + longitude + '&units=f'
    
    //console.log(url)


    request ({url, json: true}, (error, {body}) => { //shorthand syntax for url: url, destructure response and take body property
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature 
             + ' degrees out. It feels like ' + body.current.feelslike + ' degrees. The humidity is ' + body.current.humidity + "%."
            )
        }
    })
}

module.exports = forecast