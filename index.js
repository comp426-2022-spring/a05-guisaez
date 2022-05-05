// Place your server entry point code here
const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const minimist = require('minimist')

const app = express()

// Connect to Database
const database = require('./src/services/database')
const { Server } = require('http')

const args = minimist(process.argv.slice(2), {
    boolean: ['debug', 'log'],
    default: {
        debug: false,
        log: false
    }
})
args['port','port','debug']

const help = (`
server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.
--debug, -d If set to true, creates endpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.
--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.
--help, -h	Return this message and exit.
`)

if (args.help || args.h){
    console.log(help)
    process.exit(0)
}

// Serve static HTML files
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Add Endpoints
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
    
} else{
    console.log("NOTICE: not creating file access.log")
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

process.on('SIGINT', () => {
    server.close(() => {
        console.log('\n App stopped')
    })
})