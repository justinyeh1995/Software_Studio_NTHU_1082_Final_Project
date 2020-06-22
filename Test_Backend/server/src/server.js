const express = require('express');

const postRouter = require('./routers/posts.js');
const todoRouter = require('./routers/todos.js');
const ilmsRouter = require('./routers/ilms.js');
const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

// app.use(requestLogger);
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
    next();
}
app.use(allowCrossDomain)
// app.use('/api', postRouter);
// app.use('/api_todo', todoRouter);
app.use('/api_ilms', ilmsRouter);
//app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
