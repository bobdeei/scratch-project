const Session = require('../models/sessionModels');
const User = require('../models/userModels');
const axios = require('axios');

const sessionController = {};


// Verify whether there is a currently valid session
sessionController.isLoggedIn = (req, res, next) => {
  // if the current user has a cookie with a cookieId
  const cookieId = req.cookies.cookieId;

  // find the user in our DB
  Session.findOne({ cookieId }, (e, session) => {
    if (e) 
      return next({
        log: `Error caught in sessionController.isLoggedIn. \n Error Message: ${
          e.errmsg || e
        }`,
        message: { err: e.errmsg || e },
      });
    if (session) {
      return next();
    }
    // if session doesn't exist, where to redirect?
    return res.redirect();
  });
}

// Create a new session and save into the database and into cookies
sessionController.createSession = (req, res, next) => {
  const cookieId = res.locals.userProfile.id;
  Session.create(({ cookieId }), (e, session) => {
    if (e) 
      return next({
        log: `Error caught in sessionController.isLoggedIn. \n Error Message: ${
          e.errmsg || e
        }`,
        message: { err: e.errmsg || e },
      });
  });
  res.cookie('cookieId',cookieID, { httpOnly: true });
  return next();
};



module.exports = sessionController;