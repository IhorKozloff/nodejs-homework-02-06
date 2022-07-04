const { Schema, model} = require("mongoose");
const Joi = require('joi');

const subscrTypes = ["starter", "pro", "business"];

const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscrTypes,
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    
  });

  const User = model("user", userSchema);

  const register = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  })

  const login = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  })

  const subscrValidate = Joi.object({
    subscription: Joi.string().valueOf(...subscrTypes).required(),
  });

  const schemas = {
    register,
    login,
    subscrValidate
  }

  module.exports = {
    User,
    schemas
  }
