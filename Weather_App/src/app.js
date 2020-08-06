const express = require ('express');
const path = require ('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const places = require('./utils/places');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3001;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Huzefa Saifee'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Huzefa Saifee'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help Provided!',
        title: 'Help',
        name: 'Huzefa Saifee'
    });
})

app.get('/weather', (req, res) => {
    if(req.query.address)
        return weatherManual(req, res);

    else if(req.query.coords)
        return weatherFetched(req, res);

    else {
        return res.send({
            error: 'You must provide an address!'
        })
    }
})

const weatherFetched = (req, res) => {

    const coords = req.query.coords;
    const longitude = req.query.coords.toString().split(',')[0];
    const latitude = req.query.coords.toString().split(',')[1];

    // console.log(longitude, latitude)

    places(coords, (error, { location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
}

const weatherManual = (req, res) => {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
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
}

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Huzefa Saifee',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Huzefa Saifee',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on Port',port,'.')
})


// app.get('', (req, res) => {
//     res.send('<h1>Weather Application</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Huzefa',
//         age: 23
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>About Page</h2>')
// })