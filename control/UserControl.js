const usersInfo = require('../model/test');
const usersQuery = require("../model/usersQuery");
const crypto = require("crypto");

module.exports = class Member {

  constructor(){

  }
  getUserInfo(req,res){
    res.status(200).json(usersInfo)
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


