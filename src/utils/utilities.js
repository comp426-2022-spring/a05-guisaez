// This directory contains general utilities that you can use as helper functions throughout other scripts
const helpers = require('./utilities')

exports.coinFlip = () => {
    const option = ['heads', 'tails']

    const randomNumber = Math.floor(Math.random() * option.length)

    return option[randomNumber]
}

exports. coinFlips = (flips) => {
    const result = []

    for(let i = 0; i < flips; i++){
        result[i] = helpers.coinFlip()
    }

    return result
}

exports.countFlips = (array) => {
    const head = "heads"

    var output = {
        tails: 0,
        heads: 0
    }

    for(const index in array) {
        if(array[index] == head){
            output.heads = output.heads + 1
        }else{
            output.tails = output.tails + 1
        }
    }

    return output
}

exports.flipACoin = (call) => {
    const flipResult = helpers.coinFlip()

    const result = flipResult == call ? 'win' : 'lose'

    var output = {
        call: call,
        flip: flipResult,
        result: result
    }

    return output
}