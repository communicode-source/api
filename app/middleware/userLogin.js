const User = require('./../handlers/User');

var userFunctions = {
  isLoggedIn: function(req, res, next) {

    // If user is authenticated in the session, carry on
    if (new User(req).isSignedIn())
        return next();

    // If they aren't redirect them to the home page
    res.redirect('/');
  },
  ensureNotLogged: function(req, res, next) {
    if(!new User(req).isSignedIn())
      return next();
    res.redirect('/oauth/profile');
  },
  mergeUsers: function(oldUser, newUser, fields) {
    if(oldUser.Provider != 'local')
      return false;
    for(var key in fields){
      newUser[key] = (oldUser[key]) ? oldUser[key] : (newUser[key]) ? newUser[key] : null;
    }
    return newUser;
  }
}

module.exports = userFunctions;
