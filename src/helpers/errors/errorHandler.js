const catchError = require('./catchErrors');

function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    let templete = 'errors/server';

    const error =
        process.env.NODE_ENV === 'development'
            ? {
                  msg: err.message,
                  error: err,
                  param: '',
                  location: '',
              }
            : {
                  msg: 'Something went wrong',
                  param: '',
                  location: '',
              };
    res.locals.error = error;
    if (status != 404) catchError(err, req.url);

    if (req.url.split('/').includes('api')) {
        return res.status(status).json({
            success: false,
            errors: [error],
        });
    } else {
        // render the error page
        res.status(status).render(templete, { error });
    }
}

module.exports = errorHandler;
