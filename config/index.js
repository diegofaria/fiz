var configValues = require('./config')

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb://' + configValues.username + ':' + configValues.pwd + '@ds023435.mlab.com:23435/nodetodosample'
    },
    getDbConnectionStringLocalhost: function() {
        return 'mongodb://192.168.73.74:27017/nodetodosample'
    }
}
