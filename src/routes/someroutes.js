// Application endpoints
const helpers = require('../utils/utilities')

module.exports = (app) => {

    app.post('/app/flip', (req, res) => {
        res.contentType('application/json');
        res.send({"flip": helpers.coinFlip()})
    })

    app.post('/app/flips/:number', (req, res) => {
        const flipResult = helpers.coinFlips(req.body.number);

        const result = {
            "raw": flipResult,
            "summary": helpers.countFlips(flipResult)
        }
        res.contentType('application/json');
        console.log(result)
        res.status(200).json(result)
    })

    app.post('/app/flip/call/:call(heads|tails)', (req, res) => {
        res.contentType('application/json');
        res.status(200).json(helpers.flipACoin(req.body.call))
    })

    app.use(function(req, res) {
        res.status(404).send('404 NOT FOUND')
      });

}
