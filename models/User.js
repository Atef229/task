const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },

      password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
      },
    
    name: { 
        type: String ,
        required: [true, 'Please add a name']
     },

    image: { type: String },

    description: { 
        type: String,
        required: [true, 'Please add a description']
     },
});

userSchema.index({ request: 'text' });

module.exports = user = mongoose.model('User', userSchema);