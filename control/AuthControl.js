const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const usersQuery = require("../model/usersQuery");

module.exports = class Auth {
  constructor(){

  }

  getAuth(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const CryptoPassword = crypto.createHash('sha512').update(password).digest('base64');
    
        usersQuery.findUserInfo(email)
                  .then((data) => {              
                    const dbPassword = data[0][0]["Password"];
                    if(CryptoPassword === dbPassword){
                        const opts = {}
                        opts.expiresIn = '1h';
                        const secret = "SECRET_KEY"
                        const token = jwt.sign({email}, secret, opts);

                        const optsrefresh = {}
                        const secretRefresh = "SECRET_KEY"
                        optsrefresh.expiresIn = '1day'
                        const RefreshToken = jwt.sign({email}, secretRefresh, optsrefresh);


                        return res.status(200).json({
                            message : "Auth Passed",
                            token,
                            RefreshToken,
                            email : email,
                            Nickname : data[0][0]["Nickname"],
                            Sex : data[0][0]["Sex"],
                            Area : data[0][0]["Area"],
                            Age : data[0][0]["Age"] 
                        })
                    }
                    else{
                      return res.status(401).json({message : "Auth Failed"})
                    }
                    })
                  .catch(() => 
                    {
                        return res.status(401).json({message : "Auth Failed"})
                    
                  });  
  }

  getNewToken(req,res){
    const AccessToken = req.headers['authorization']
    const opts = {}
    opts.expiresIn = '1h';
    const secret = "SECRET_KEY"
    jwt.verify(AccessToken,secret,(err, decoded) => {

      
      const email = decoded
      const token = jwt.sign({email}, secret, opts);
      return res.status(200).json({
        token
      })
    })
  }
 
  getSnsAuth(req,res){
    const email = req.user                       
    const opts = {}
    opts.expiresIn = '1h';
    const secret = "SECRET_KEY"
    const token = jwt.sign({email}, secret, opts);
    req.session.token = token;
    res.cookie('token',token)
    res.cookie('email',email)
    res.redirect('http://192.168.1.8:8080');
  }

  


}
  
