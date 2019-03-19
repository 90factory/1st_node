const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const usersQuery = require('./model/usersQuery');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY';

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {

  const email = jwt_payload.email

  usersQuery.searchOneEmail(email)
            .then(()=>{return done(null,true)})
            .catch(()=>{return done(null,false)})

 
})