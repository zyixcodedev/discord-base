const FS = require('fs')


const Colors = {
    red:    "\x1b[31m",
    blue:   "\x1b[34m",
    green:  "\x1b[32m",
    yellow: "\x1b[33m",
    reset:  "\x1b[0m"
}

/*

    [   INFO  ]
    [ WARNING ]
    [  ERROR  ]

*/

module.exports = {
    async info(message) {
        const DATE = new Date()
        if (!FS.existsSync('logs/')) {FS.mkdirSync('logs/')}
        if (!FS.existsSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`)) { FS.writeFileSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`, '') }
        console.log(`${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()} : ${DATE.getUTCHours()+1}:${DATE.getUTCMinutes()} [${Colors.blue}INFO${Colors.reset}] ${message}`)
        FS.appendFileSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`, `\n${DATE.getUTCHours()}:${DATE.getUTCMinutes()} [INFO] ${message}`)
    },
    async warning(message) {
        const DATE = new Date()
        if (!FS.existsSync('logs/')) {FS.mkdirSync('logs/')}
        if (!FS.existsSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`)) { FS.writeFileSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`, '') }
        console.log(`${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()} : ${DATE.getUTCHours()+1}:${DATE.getUTCMinutes()} [${Colors.yellow}WARNING${Colors.reset}] ${message}`)
        FS.appendFileSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`, `\n${DATE.getUTCHours()}:${DATE.getUTCMinutes()} [WARNING] ${message}`)
    },
    async error(message) {
        const DATE = new Date()
        if (!FS.existsSync('logs/')) {FS.mkdirSync('logs/')}
        if (!FS.existsSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`)) { FS.writeFileSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`, '') }
        console.log(`${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()} : ${DATE.getUTCHours()+1}:${DATE.getUTCMinutes()} [${Colors.red}ERROR${Colors.reset}] ${message}`)
        FS.appendFileSync(`logs/${DATE.getUTCDate()}.${DATE.getUTCMonth()+1}.${DATE.getUTCFullYear()}.log`, `\n${DATE.getUTCHours()}:${DATE.getUTCMinutes()} [ERROR] ${message}`)
    }
}


