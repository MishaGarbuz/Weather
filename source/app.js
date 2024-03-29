const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000
// define paths for express coniguration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handle bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michael'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Michael'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Michael',
        helpText: 'Simple help text'
    })
})


app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
           return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address

            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Michael',
        error: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Michael',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server up on port ' + port)
})