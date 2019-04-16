const path = require('path')
const hbs= require('hbs')
const express = require('express')

const geocode= require('./utils/geocode.js')
const forecast= require('./utils/forecast.js')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shashwat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shashwat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Shashwat',
        helpText: 'This is some helpful text.',
        title:'Help page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Error',
        })
    }
        geocode.geocode(req.query.address, (error, response)=>{
            if(error){
                res.send({
                    error: error,
                })
            }
            else{
                forecast.forecast(response.latitude, response.longitude,(error, response)=>{
                    if(error){
                        res.send({
                            error: error,})}
                    
                    else{
                        res.send({
                            forecast: response,
                            location: req.query.address,
                        });
                    }
                });
            }
        })
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send('Error')
    }
    res.send({
        products:[],
    })
})

app.get('/help/*', (req, res)=>{
    res.render('helpError',{
        name: 'Shashwat',
        helpText: 'Help article not found.',
        title:'Error Help Page'
    });
})

app.get('*', (req, res)=>{
    res.render('error',{
        name: 'Shashwat',
        helpText: 'My 404 error',
        title:'Error Page'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})