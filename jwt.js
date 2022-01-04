const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SECRET_KEY"; //this would usually be stored this in process.env.secret

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
  if (jwt_payload.email === "youremail@gmail.com") {
    return done(null, true);
  }
  return done(null, false);
});
