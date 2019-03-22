const usersQuery = require("../model/usersQuery");
const crypto = require("crypto");

module.exports = class Member {

  constructor(){

  }
  getUserInfo(req,res){
    const petitionID = req.query.petitionID;
    usersQuery.getRecommend(petitionID)
              .then((data)=>{
                let temp = []
                data[0].forEach(recommend => {
                   if(recommend.VotingStatus === 1){
                      temp.push(recommend.Email)
                   }
                   
                })

                if(temp.length === 0){
                  res.status(200).json({message : "No Recommend"})
                  return 0;
                }

                let emailList = temp.reduce((a,b) => {
                    if( a.indexOf(b) < 0){
                      a.push(b)
                    }
                    return a
                },[])
                
                  usersQuery.findInfo(emailList)
                          .then(data =>{
                            let userData = []
                            data[0].forEach(info =>{
                              let data = {}
                              data.sex = info.Sex
                              data.age = info.Age
                              data.area = info.Area
                              userData.push(data)
                            })
                            res.status(200).json(userData)
                          })
                          .catch(() =>{res.status(401).json({})})
              })
              .catch(()=>{
                res.status(401).json({message :"No Data"})
              })
          
  }

  updateUserInfo(req,res){
    const email = req.body.email;
    const area = req.body.area;
    const nickname = req.body.nickname;
    const sex = req.body.sex;
    const age = req.body.age
   
    usersQuery.updateUserInfo(email,area,nickname,sex,age)
              .then(()=>{
                return res.status(200).json({
                    message : "update Completed"
                })
              })
  }
  updatePassword(req,res){
    const email = req.body.email;
    const area = req.body.area;
    const nickname = req.body.nickname;
    const sex = req.body.sex;
    const age = req.body.age
   
    usersQuery.updateUserInfo(email,area,nickname,sex,age)
              .then(()=>{
                return res.status(200).json({
                    message : "update Completed"
                })
              })
  }
  registerUser(req,res){
    const newEmail = req.body.email;
    const area = req.body.area;
    const nickname = req.body.nickname;
    const sex = req.body.sex;
    const age = req.body.age
    const password = req.body.password
    const cryptoPassword = crypto.createHash('sha512').update(password).digest('base64');                  
    usersQuery.singUp(newEmail,cryptoPassword,area,age,sex,nickname)
              .then(()=> {
                return res.status(200).json({
                    message : "Sign up Completed"
                })
              })             
              .catch(() =>{return res.status(401).json({message : "Sign up Fail"})})
  }
  deleteUser(req,res){
    const email = req.body.email
    const password = req.body.password
    const cryptoPassword = crypto.createHash('sha512').update(password).digest('base64'); 
    usersQuery.searchPassword(email)
              .then(result => {
                if(result[0][0]['Password'] === String(cryptoPassword)){
                    usersQuery.deleteUser(email)
                    return res.status(200).json({
                        message : "Delete User Completed"
                })}})
              .catch(() => { res.status(401).json({message : "wrong password"}) })
  }

}


