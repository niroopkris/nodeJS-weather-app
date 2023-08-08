const path = require('path')
const express = require('express')  //express here is a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()   //great tool for making front-end webservers 
const port = process.env.PORT || 3000

//Define paths for Express config
                                                            //public is the directory which will contain contents we want to take and display to the browser
const publicDirectoryPath = path.join(__dirname, '../public') //path.join will create a path to index.html, which is where we will get our html code from
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')   //tell express what template engine we installed
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))    //static will serve (provide) the html codde in index.html

//app.get longer run (the base localhost:3000) when it comes from static html files, but it will work when obtaining from hbs dynamic files
//an html page can be created in public for each different '/link'

app.get('', (req, res) => { //req = request, res = response       --> r
    res.render('index', {
        title: 'Weather',
        name: 'Doop Roop'
    })

     //res.send('<h1>Weather</h1>') //sending HTML font
 })

 app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Doop Roop'
    })
 })

 app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help me!!!!!!',
        title: 'Help Me!',
        name: 'Doop Roop'
    })
 })
 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => { //shorthand syntax, takes latitude and longitude properties from input (data)
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
     })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//catching help link errors
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found'
    })
})

//404 error for wrong links
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => { //starts the server, parameter = port  -- this server will stay running until we close it
    console.log('Server is up on port 3000')
}) 