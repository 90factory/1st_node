const express = require('express');
const router = express.Router();
const Auth = require('../control/AuthControl')
const DetailInfo = require('../control/PetitionInfoControl')
const Member = require('../control/UserControl')
const passport = require('passport');
const jwtStrategy = require('../jwt');
passport.use(jwtStrategy)

const PetitionController = new DetailInfo();
const AuthController = new Auth();
const UserController = new Member();

router.get('/petitions',PetitionController.getPetition)
router.get('/detail',passport.authenticate('jwt',{session:false}),UserController.getUserInfo)
router.get('/search',passport.authenticate('jwt',{session:false}),PetitionController.getSearch)
router.post('/login', AuthController.getAuth)
router.post('/revise',passport.authenticate('jwt',{session:false}),UserController.updateUserInfo)
router.post('/register',UserController.registerUser)
router.post('/password',passport.authenticate('jwt',{session:false}),UserController.updatePassword)
router.post('/delete',passport.authenticate('jwt',{session:false}),UserController.deleteUser)
router.get('/refreshtoken',passport.authenticate('jwt',{session:false}),AuthController.getNewToken)



/*const express = require('express');
const router = express.Router();
const AuthController = require('../control/AuthControl')
const PetitionController = require('../control/PetitionInfoControl')
const UserController = require('../control/UserControl')
const passport = require('passport');
const jwtStrategy = require('../jwt');
passport.use(jwtStrategy)*/

/*
router.get('/petitions',PetitionController.getPetition)
router.get('/detail',passport.authenticate('jwt',{session:false}),UserController.getUserInfo)
router.get('/search',passport.authenticate('jwt',{session:false}),PetitionController.getSearch)
router.post('/login', AuthController.getAuth)
router.post('/revise',passport.authenticate('jwt',{session:false}),UserController.updateUserInfo)
router.post('/register',UserController.registerUser)
router.post('/password',passport.authenticate('jwt',{session:false}),UserController.updatePassword)
router.post('/delete',passport.authenticate('jwt',{session:false}),UserController.deleteUser)
router.get('/refreshtoken',passport.authenticate('jwt',{session:false}),AuthController.getNewToken)
*/
module.exports = router;