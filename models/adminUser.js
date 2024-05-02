const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      minlength: 3,
      maxlength: 50,
    },

    company_name: {
        type: String,
        minlength: 3,
        maxlength: 50,
      },
    
      address: {
        type: String,
        minlength: 3,
        maxlength:100,
      },
    
    email: {
      type: String,
      required: [true, "Email is Required"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide Valid Email",
      ],
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superuser"],
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: 6,
    },
    api_keys:{
        type:[Object], // {String,active}
        required: [true, "API KEY is required"],
    },

    api_validity:{
        type: Date
    },

    api_active:{
        type:Boolean,
        default:true
    }
  },
  { timestamps: true }
);

AdminUserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminUserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

AdminUserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("AdminUser", AdminUserSchema);