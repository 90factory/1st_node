const express = require('express');
const router = express.Router();
const Auth = require('../control/AuthControl')
const DetailInfo = require('../control/PetitionInfoControl')
const Member = require('../control/UserControl')
const passport = require('passport');
const jwtStrategy = require('../jwt');
const facebookstrategy = require('../faceBook');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const session = require('express-session')
passport.use(jwtStrategy)
passport.use(facebookstrategy);
const PetitionController = new DetailInfo();
const AuthController = new Auth();
const UserController = new Member();

router.use(cors());
router.get('/petitions',PetitionController.getPetition)
router.get('/detail',passport.authenticate('jwt',{session:false}),UserController.getUserInfo)
router.get('/search',passport.authenticate('jwt',{session:false}),PetitionController.getSearch)
router.post('/login', AuthController.getAuth)   
router.get('/facebook',passport.authenticate('facebook'))
router.get('/facebook/auth',passport.authenticate('facebook', {session: false,failureRedirect :'https://192.168.1.5:8080'}),AuthController.getSnsAuth)
router.get('/facebook/privateInfo',UserController.getSnsMember)
router.post('/revise',passport.authenticate('jwt',{session:false}),UserController.updateUserInfo)
router.post('/register',UserController.registerUser)
router.post('/register/sns',UserController.registerSnsMember)
router.post('/password',passport.authenticate('jwt',{session:false}),UserController.updatePassword)
router.post('/delete',passport.authenticate('jwt',{session:false}),UserController.deleteUser)
router.post('/delete/sns',passport.authenticate('jwt',{session:false}),UserController.deleteSnsUser)
router.get('/refreshtoken',passport.authenticate('jwt',{session:false}),AuthController.getNewToken)
router.post('/history',passport.authenticate('jwt',{session:false}),PetitionController.postHistory)
router.get('/history',passport.authenticate('jwt',{session:false}),PetitionController.getHistory)
router.post('/recommend',passport.authenticate('jwt',{session:false}),PetitionController.postRecommend)
router.get('/keyword',PetitionController.getKeyword)
module.exports = router;