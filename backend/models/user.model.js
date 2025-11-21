import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 6,
    maxLength: 50,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Hash password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Compare password
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email, // include email in token
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
const User = mongoose.model("User", userSchema);
export default User;
