// Place your server entry point code here
const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const minimist = require('minimist')

const app = express()

// Connect to Database
const database = require('./src/services/database')

const args = minimist(process.argv.slice(2), {
    boolean: ['debug', 'log'],
    default: {
        debug: false,
        log: false
    }
})
args['port','port','debug']

// Serve static HTML files
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Add Enpoints
require('./src/routes/someroutes')(app)
require('./src/middleware/mymiddleware')(app)


// Start application server
const port = args.port || 5555

const server = app.listen(port, () => {
    console.log('App is running and listening on port %PORT%'.replace('%PORT%', port))
})

if(args.log == true) {
    const accesslog = fs.createWriteStream('./data/db/access.log', {flags: 'a'});
    app.use(morgan('combined', {stream: accesslog }))
}

if (args.debug == true) {
    app.get('/app/log/access', (req, res) => {
        const select = database.prepare('SELECT * FROM accesslog').all();
        res.status(200).json(select);
    })

    app.get('/app/error', (req, res) => {
        throw new Error('Error test successful.')
    })
}