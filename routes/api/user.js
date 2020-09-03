const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({ accessKeyId: "AKIA4WGI276NCEJHRNFD", secretAccessKey: "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" });

// Load User model
const User = require('../../models/User');

// Load Input Validation
 const validateRegisterInput = require('../../validation/user-register');
 const validateLoginInput = require('../../validation/user-login');


// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


// @route   POST api/user/register
// @desc    add user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
   return res.status(400).json(errors);
     }

    User.findOne({email: req.body.email}).then(user => {
      if (user) {
          
        errors.email = 'Email already Taken';
        return res.status(400).json(errors);
      } else {

        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          description: req.body.description,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
        newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
      });
    }); 
      }
    });
  });

// @route   POST api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

 // Check Validation
 if (!isValid) {
   return res.status(400).json(errors);
 }

 const email = req.body.email;
 const password = req.body.password;

 // Find user by email
 User.findOne({ email }).then(user => {
   // Check for user
   if (!user) {
     errors.email = 'Email not found';
     return res.status(404).json(errors);
   }

   // Check Password
   bcrypt.compare(password, user.password).then(isMatch => {
     if (isMatch) {

      // create a token
     var token = jwt.sign({ _id: user._id , email: user.email,description: user.description,image: user.image,name: user.name},
       keys.secretOrKey, {
     expiresIn: 86400 // expires in 24 hours
     });
     res.status(200).send({ auth: true, token: token });

     }else {
       return res.status(400).json({password:'wrong password'});
     }
   });
});
});

// @route   PUT api/user/update/:user_id
// @desc    update user by id 
// @access  public

  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'merntask',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, "User-img " + uuid.v1())
      }
    })
  });

router.put('/uploadphoto/:_id', upload.single('Image'), function (req, res) {
 
    User.findOne({ _id: req.params._id })
       .then(user => {
         if (!user) {
           res.status(404).json('User not found');
         }else
           users =
           req.params.email,
           req.params.password,
           req.params.name,
           req.params.description,
           image = req.file.location;
   
         User.findOneAndUpdate({_id: req.params._id}
           ,{users,image}, {new: true},
            function (err, user) {
             res.status(200).send(user);
         });
       })
   });

// @route   GET api/user/:user_id
// @desc    Get user by ID
// @access  Public
router.get('/:_id', (req, res) => {
  const errors = {};
  User.find({ _id: req.params._id })
    .then(user => {
      if (user==0) {
        errors._id = 'User not found';
        res.status(404).json(errors);
      }

      res.json(user);
    })
    .catch(err =>
      res.status(404).json({ user: 'no user found' })
    );

});


module.exports = router;