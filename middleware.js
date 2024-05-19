//Middleware for authorization
module.exports.ensureAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must be logged in first :(");
      return res.redirect("/login");
    }
    next();
  };

  module.exports.saveRedirectUrl = (req,res, next) => {
    if(req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
      console.log(res.locals.redirectUrl);
    }
    next();
  }