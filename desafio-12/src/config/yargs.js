const argv = require('yargs')
    .options({
        'p':{
            alias: 'port',
            type: 'number'
        }
    })
    .check((argv,options) => {
        if (argv.p && isNaN(argv.p)){
            throw 'E puerto es incorrecto';
        }
        return true;
    })
    .argv;

module.exports = argv;