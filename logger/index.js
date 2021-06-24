const { format, transports, createLogger } = require('winston');
const { formatMessage } = require('./formatMessage');

const getPlainMessage = (winstonInfo) => {
  if (typeof winstonInfo.message === 'object') {
    return { ...winstonInfo, message: formatMessage(winstonInfo.message) };
  }
  return winstonInfo;
};

// Sometimes the result is too long to store in elasticSearch.
const limitResultReplacer = length => (key, value) => (key === 'data' ? JSON.stringify(value).substr(0, length) : value);
const envIsProduction = () => process.env.NODE_ENV === 'production';
const logger = createLogger({
  transports: [
    new transports.Console({
      level: envIsProduction() ? 'info' : 'debug',
      format: envIsProduction() ? format.json({ replacer: limitResultReplacer(500) }) : format.combine(
        format.colorize(),
        format(getPlainMessage)(),
        format.simple(),
      ),
    }),
  ],
});
logger.on('error', err => console.error(`winston logger got error${err}`));

module.exports = logger;