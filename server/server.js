const express = require('express')
const dotenv = require('dotenv');
dotenv.config({path: '.env.local'});
const port = 3001
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//enables communication between localhost ports
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//root route with default response
app.get('/',(req, res) => {
    res.send('requires correct route')
})

//route to event requests
const eventsRouter = require('./routes/events');
app.use('/events',eventsRouter);

//route to module requests
const modulesRouter = require('./routes/modules');
app.use('/modules',modulesRouter);

//route to user requests
const usersRouter = require('./routes/users');
app.use('/users',usersRouter);

//route to report requests
const ReportsRouter = require('./routes/reports');
app.use('/reports',ReportsRouter);

//route to location requests
const locationsRouter = require('./routes/locations');
app.use('/locations',locationsRouter);

//route to qrcode scanning requests
const qrcodeRouter = require('./routes/qrcode');
app.use('/qrcode',qrcodeRouter);

//listens for http requests on specified port
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})