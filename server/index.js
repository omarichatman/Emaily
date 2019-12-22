const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

require('./models/user');
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./services/passport');

if(process.env.NODE_ENV === 'production') {
    // Production assets from Express
    app.use(express.static('client/build'));
    // Index.html if noute not recognized from Express
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.listen(PORT);