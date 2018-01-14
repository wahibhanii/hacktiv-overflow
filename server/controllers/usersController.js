'use strict'
const User = require('../models/user');
const bcrypt      = require('bcryptjs');
const salt        = bcrypt.genSaltSync(10);
const jwt         = require('jsonwebtoken');

class UserController {

  static createUser(req, res) {
    
    console.log(req.body, (req.body.email!=undefined) && (req.body.userName!=undefined) && (req.body.password!=undefined) )
    if (req.body.email!=undefined && req.body.userName!=undefined && req.body.password!=undefined){
      let newUser = {
        email       : req.body.email,
        userName    : req.body.userName,
        password    : bcrypt.hashSync(req.body.password, salt),
      }
      console.log('pass================')
      User.findOne({email: req.body.email})
      .then(userResult => {
        console.log(userResult)
        if (userResult === null){
          return  User.create(newUser)
        } else {
          res.status(202).json({
            message: 'Email already in use, forgot password?'
          })
        }
      })
      .then(result => {
        res.status(200).json({
          message : 'Create new User success!',
          data    : result
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      })
    } else {
      res.status(400).json({
        message: 'bad request'
      });
      
    }
    
  }

  static login(req, res) {
    User.findOne({email: req.body.email})
    .then(userResult => {
      if (userResult === null) {
        console.log('User not found')
        res.status(202).json({
          message : 'user not found',
          isLoggedIn : false,
        })
      } else {
        if (bcrypt.compareSync(req.body.password, userResult.password)){
          console.log('Login Success!')
          let payload = {
            _id  : userResult._id,
            email    : userResult.email,
            userName  : userResult.userName
          }
          console.log(payload)
          let token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
          res.status(200).json({
            message : 'Login Success!',
            token    : token,
            isLoggedIn : true,
          })
  
        } else {
          console.log('Wrong Password, login fail')
          res.status(202).json({
            message: 'Wrong Password, login fail',
            isLoggedIn : false,
          })
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static findAllUsers(req, res) {
    User.find({})
    .then(dataUsers => {
      res.status(200).json({
        message  : 'Users found!',
        data     : dataUsers
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static findUserById(req, res) {
    User.findOne({_id: req.params.id})
    .then(dataUser => {
      if (dataUser === null){
        res.status(204).json({
          message: 'User not found!'
        })
      } else {
        res.status(200).json({
          message  : 'User found!',
          data     : dataUser
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static updateUser(req, res){
    let data = JSON.parse(req.body.update)
    User.findOneAndUpdate({_id:req.params.id}, data, {new: true})
    .then(result => {
      res.status(200).json({
        message: 'User data updated!',
        data: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static deleteUser (req, res) {
    User.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Delete User entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static followUnfollow(req, res) {
    let targetUserId = req.params.id
    let originUserId = req.headers.decoded._id
    console.log(req.headers.decoded,'======')
    User.findOne({_id: originUserId})
    .then(userData => {
      // res.send(userData)
      console.log(userData.following.indexOf(targetUserId),'==========-------')
      if (userData.following.indexOf(targetUserId) === -1) {
        // follow
        console.log('following . . .' )
        userData.following.push(targetUserId)
        User.update({_id: originUserId},userData)
        .then(result=> {
          return User.findOne({_id: targetUserId})
        })
        .then(targetUser => {
          targetUser.followers.push(originUserId)
          return User.update({_id: targetUserId}, targetUser)
        })
        .then(targetResult => {
          res.status(200).json({
            message: 'Follow successful',
            data: targetResult
          })
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err)
        })
      } else {
        // unfollow
        console.log('unfollowing . . .')
        userData.following.splice(userData.following.indexOf(targetUserId),1)
        User.update({_id: originUserId},userData)
        .then(result=> {
          return User.findOne({_id: targetUserId})
        })
        .then(targetUser => {
          targetUser.followers.splice(targetUser.followers.indexOf(originUserId),1)
          return User.update({_id: targetUserId}, targetUser)
        })
        .then(targetResult => {
          res.status(200).json({
            message: 'Unfollowing successful',
            data: targetResult
          })
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err)
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }
}

module.exports = UserController;