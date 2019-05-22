const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebats engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// ROUTES
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Naveen Sagar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Naveen Sagar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Help is on its way.',
        name: 'Naveen Sagar',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided!'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData  
            })            
        })
    })  
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Search must be provided'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Naveen Sagar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Naveen Sagar',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})