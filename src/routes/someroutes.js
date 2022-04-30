// Application endpoints
const helpers = require('../utils/utilities')

module.exports = (app) => {
    
    app.get('app/', (req,res,next) => {
        res.json({message: "Your API works!" (200)})
    })

    app.get('/app/flip/', (req, res) => {
        const flip = helpers.coinFlip()
        res.status(200).json({"flip": flip})
    })

    app.post('/app/flip/coins/', (req, res, next) => {
        const flipResult = helpers.coinFlips(req.body.number);
        const summary = helpers.countFlips(flipResult)

        const result = {
            "raw": flipResult,
            "summary": summary
        }
        console.log(result)
        res.status(200).json(result)
    })

    app.get('/app/flips/:number', (req, res, next) => {
        const flips = helpers.coinFlips(req.params.number)
        const summary = helpers.countFlips(flips)
        res.status(200).json({"raw": flips, "summary": summary})
    })


    app.post('/app/flip/call/', (req, res) => {
        res.status(200).json(helpers.flipACoin(req.body.call))
    })

    app.get('/app/flip/call:guess(heads|tails)/', (req, res, next) => {
        const result = helpers.flipACoin(req.params.guess)
        res.status(200).json(result)
    })

    app.use(function(req, res) {
        res.status(404).end('404 NOT FOUND')
      });

}
