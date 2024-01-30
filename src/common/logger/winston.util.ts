import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const dailyOption = (level: string) => {
    return {
        level,
        datePatter: 'YYYY-MM-DD',
        dirname: `./logs/${level}`,
        filename: `%DATE%.${level}.log`,
        maxFiles: 365,
        zippedArchive: true,
        format: winston.format.combine(
            winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
            utilities.format.nestLike(process.env.NODE_ENV, {colors: false, prettyPrint: true}),
        ),
    }
}

export const winstonLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV == 'prd' ? 'info' : 'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike(process.env.NODE_ENV, {colors: true, prettyPrint: true}),
            ),
        }),
        new winstonDaily(dailyOption('debug')),
        new winstonDaily(dailyOption('warn')),
        new winstonDaily(dailyOption('error')),
    ],
})

const { printf } = winston.format;
const logFormat = printf(info => {
    return `${info.timestamp},${info.message}`
})

const transactionOption = (level: string) => {
    return {
        level,
        datePatter: 'YYYY-MM-DD',
        dirname: `./logs/transaction`,
        filename: `%DATE%.transaction.log`,
        maxFiles: 365,
        zippedArchive: true,
        format: winston.format.combine(
            winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
            logFormat,
        ),
    }
}
export const transactionLogger = WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({}),
        new winstonDaily(transactionOption('info')),
    ],
})