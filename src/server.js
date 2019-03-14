const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const path = require('path');

const config = require('./config/config.js')
const mainRouter = require('./routes/main');
const authRouter = require('./routes/authvk');

app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.sessionSecret,
  key: "sid",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ url: config.dbURL })
}));

app.use(mainRouter);
app.use(authRouter);

mongoose.Promise = global.Promise
mongoose.connect(config.dbURL, config.dbOptions)

mongoose.connection
  .once('open', () => {
    console.log("Mongoose - successful connection ...")
    const port = (process.env.PORT || config.port);
    app.listen(port,
      () => console.log("Server start on port", port, "..."))
  })
  .on('error', error => console.warn(error))
  .on('disconnected', () => console.log('Database disconnected'))

