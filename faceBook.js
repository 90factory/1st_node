const FacebookStrategy = require('passport-facebook').Strategy;

const usersQuery = require('./model/usersQuery');


module.exports = new FacebookStrategy ({
    clientID: '2095342310556010',
    clientSecret: '4889e2a6f5f1152326329af934a7fd30',
    callbackURL: "http://192.168.1.8:3000/facebook/auth",
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name']
},
  function(req,accessToken, refreshToken, profile, done) {
    const token = accessToken
    const email = profile.emails[0].value
    console.log(email)
    usersQuery.searchSNSUser(email)
              .then((result)=>{
                
                const isMember = result[0].length
                if(isMember === 0) {
                 
                  usersQuery.registerSNSmember(email)
                  return done(null,email)
                }else{
                
                  return done(null,email)
                }
              
              })
              .catch(()=>{return done(null,false)})
            
   
  }
);  