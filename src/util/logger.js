const { createLogger, format, transports} = require('winston');
const { combine, colorize, printf, timestamp, prettyPrint} = format;

exports.logger = createLogger({
    format: combine(
        colorize(),
        timestamp(),
        prettyPrint(),
        printf(({level, timestamp, message}) => {
            return `[${level}] ${timestamp}: ${message}`;
        })
    ),
    transports: [
        new transports.Console()
    ]
});