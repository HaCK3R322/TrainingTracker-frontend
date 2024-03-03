class Logger {
    constructor(loggerName) {
        this.loggerName = loggerName || 'DefaultLogger';
    }

    log(...args) {
        console.log(`[${this.loggerName}]`, ...args);
    }

    error(...args) {
        console.error(`[${this.loggerName}]`, ...args);
    }

    warn(...args) {
        console.warn(`[${this.loggerName}]`, ...args);
    }

    info(...args) {
        console.info(`[${this.loggerName}]`, ...args);
    }
}

export default Logger