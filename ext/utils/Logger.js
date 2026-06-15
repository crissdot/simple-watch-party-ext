class Logger {
  static LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    NONE: 4,
  };

  constructor(level = "INFO") {
    this.level = Logger.LEVELS[level.toUpperCase()] ?? Logger.LEVELS.INFO;
  }

  setLevel(level) {
    this.level = Logger.LEVELS[level.toUpperCase()] ?? this.level;
  }

  timestamp() {
    return new Date().toISOString();
  }

  debug(...args) {
    if (this.level <= Logger.LEVELS.DEBUG) {
      console.debug(`[DEBUG] ${this.timestamp()}`, ...args);
    }
  }

  info(...args) {
    if (this.level <= Logger.LEVELS.INFO) {
      console.info(`[INFO]  ${this.timestamp()}`, ...args);
    }
  }

  warn(...args) {
    if (this.level <= Logger.LEVELS.WARN) {
      console.warn(`[WARN]  ${this.timestamp()}`, ...args);
    }
  }

  error(...args) {
    if (this.level <= Logger.LEVELS.ERROR) {
      console.error(`[ERROR] ${this.timestamp()}`, ...args);
    }
  }
}

const logger = new Logger();