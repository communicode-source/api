const routes     = require('express').Router();
const greetings  = require('./greetings');
const mailDaemon = require('./mail');
const token      = require('./../middleware/genToken');
const auth       = require('./../config/auth.json');
const AuthRoutes = require('./oauth');
const UserRoutes = require('./users');
const developers = require('./users/developers');
const nonprofits = require('./users/nonprofits');
const JwtRoutes  = require('./token');
const userInt    = require('../handlers/User');
const path       = require('path');
const projects   = require('./projects');
const matches    = require('./matches');

// Telling express what route goes to this greeting.
routes.use('/api/greeting', greetings);
routes.use('/api/secure/mail', mailDaemon);
routes.use('/api/users', UserRoutes);
routes.use('/api/developers', developers);
routes.use('/api/nonprofits', nonprofits);
routes.use('/oauth', AuthRoutes);

// The actual generating of the token should be done when a user logs in or something.
routes.use('/api/token', JwtRoutes);
routes.use('/api/projects', projects);
routes.use('/api/matches', matches);

// res = response, req = request.
// More routing, telling express what to send back.
routes.get('/api', (req, res) => {
  res.status(200).json({ message: 'Connection Made!' });
});


// Exporting it.
module.exports = routes;
