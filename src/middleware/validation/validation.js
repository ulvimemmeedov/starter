const { validationResult, matchedData } = require('express-validator');

function checkValidation(req, res, next) {
    const errors = validationResult(req, { strictParams: true });
    const data = matchedData(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (Object.keys(data).length !== Object.keys(req.body).length) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'Invalid request body',
                    param: '',
                    location: 'body',
                },
            ],
        });
    }
    const role = data.role;
    data.role = role === '1' ? 'admin' : role === '2' ? 'superAdmin' : '';

    req.locals.data = data;
    return next();
}

module.exports = checkValidation;
