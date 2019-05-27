module.exports = loggingSqlCommand = (logMessage, prefix = null) => {
    console.log(new Date(), prefix, logMessage)
}

