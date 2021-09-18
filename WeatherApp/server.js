if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY
const express = require('express')
const app = express()
const axios = require('axios')
const { response } = require('express')

app.use(express.json()) // only json will be sent to app
app.use(express.static('public')) // public folder

// single endpoint
app.post('/weather', (req, res) => {


    // console.log(req.body)
    // const params = {
    //     access_key: process.env.WEATHERSTACK_API_KEY,
    //     query: 'New York'
    //   }
      
    //   axios.get('http://api.weatherstack.com/current', {params})
    //     .then(response => {
    //       const apiResponse = response.data;
    //       console.log(response)
    //       console.log(response.data)
    //       console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
    //     }).catch(error => {
    //       console.log(error);
    //     });

    console.log(req.body.query)
    
    var uri = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${req.body.query}&units=m`
    var uriRes = encodeURI(uri)
    axios.get(uriRes)
        .then(r => res.json(r.data)) // ta tuto do horneho resu json ako keby write (r.data)
        .catch(error => {
            console.log(error);
        });
})

app.listen(3000, () => {
    console.log('Server started')
})

