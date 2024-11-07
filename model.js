const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same username
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
    match: /.+\@.+\..+/ // Basic email validation
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['patient', 'doctor'], // Limits the user types to these values
    default: 'patient', // Default value
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
