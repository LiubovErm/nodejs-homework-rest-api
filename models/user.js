const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validationError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", validationError);

const registerUpSchema = Joi.object({
  name: Joi.string().required().messages({"any.required": "missing field name"}),
  email: Joi.string().required().messages({"any.required": "missing field email"}),
  password: Joi.string().min(6).required().messages({"any.required": "missing field password"}),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({"any.required": "missing field email"}),
  password: Joi.string().min(6).required().messages({"any.required": "missing field password"}),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;
const verifyEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({"any.required": "missing required field email"}),
});

const User = model("user", userSchema);

const schemas = {
  registerUpSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema
};

module.exports = { schemas, User };