'use strict';

module.exports = (app) => {

    //Logs
    //==========================================
    app.use((req, res, next) => {
        console.log(req.method + " " + req.originalUrl);
        next();
    });

    //CORS
    //==========================================
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Access-Token,Access-Token,Keep-Alive,User-Agent,Content-Type, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Credentials", "true");
        if ('OPTIONS' === req.method) {
            res.sendStatus(200);
        } else {
            next();
        }
    });


    //Api
    //==========================================
    app.use('/api', require('./routes.js'));


    //Errors
    //==========================================

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });

};