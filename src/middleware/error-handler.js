const errorCodes = {
    "P2002": {
        "status" : 409,
        "message":"invalid username"},
    "P2025": {
        "status" : 409,
        "message":"invalid username"}
}
const errorMessages = {
    "invalid signature" : {
        "status": 403,
        "message": "forbidden"
    }, 
    "missing input" : {
        "status": 400,
        "message": "missing input"
    }, 
    "forbidden":  {
        "status": 403,
        "message": "forbidden"
    }, 
}

const handleErrors = (err, req, res, next) => {
    const code = err.code
    const message = err.message

    if (errorCodes[code]) {
        return res.status(errorCodes[code].status).json({error: errorCodes[code].message})
    }
    if (errorMessages[message]) {
        return res.status(errorMessages[message].status).json({error: errorMessages[message].message})
    }
    
    return res.status(500).json({error: "oops, something went wrong!"})
}

module.exports = handleErrors 