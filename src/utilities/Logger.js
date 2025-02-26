class Logger {
    static LOG_LEVELS = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };

    static currentLogLevel = Logger.LOG_LEVELS.INFO;

    static setLogLevel(level) {
        this.currentLogLevel = level;
    }

    static debug(message, ...args) {
        if (this.currentLogLevel <= Logger.LOG_LEVELS.DEBUG) {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    }

    static info(message, ...args) {
        if (this.currentLogLevel <= Logger.LOG_LEVELS.INFO) {
            console.info(`[INFO] ${message}`, ...args);
        }
    }

    static warn(message, ...args) {
        if (this.currentLogLevel <= Logger.LOG_LEVELS.WARN) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }

    static error(message, ...args) {
        if (this.currentLogLevel <= Logger.LOG_LEVELS.ERROR) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }
}

export default Logger;