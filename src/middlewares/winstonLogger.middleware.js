import winstonLogger from "../utils/winston.utils.js";

function winston(req, res, next){
    try {
        req.logger= winstonLogger;
        const message = `${req.method} ${req.url}`;
        req.logger.http_api(message);
        return next();
    } catch (error) {
        return next(error);
    }
};

export default winston;