const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoibmF2ZWVuc2FnYXIiLCJhIjoiY2p2dWk0YWJzMHp2bTQzbWtkZDlhaHgweSJ9.4rXrEYzGAM0QVJQmNSJlGQ&limit=1'
    request({ url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if ( body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


// const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmF2ZWVuc2FnYXIiLCJhIjoiY2p2dWk0YWJzMHp2bTQzbWtkZDlhaHgweSJ9.4rXrEYzGAM0QVJQmNSJlGQ&limit=1"

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to mapbox')
//     } else if (body.features.length === 0) {
//         console.log('Location is invalid. Please try another location')
//     } else {
//         const latitude = body.features[0].center[1]
//         const longitude = body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
// });