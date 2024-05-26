import Joi from "@hapi/joi";
import { CONSTANTS } from "../enum";

const register = Joi.object().keys({
  fn: Joi.string().required(),
  un: Joi.string().required(),
  email: Joi.string().required(),
  pwd: Joi.string().required(),
  role: Joi.string()
    .valid(
      CONSTANTS.ROLE.SUPER_ADMIN,
      CONSTANTS.ROLE.ADMIN,
      CONSTANTS.ROLE.USER
    )
    .required(),
  add: Joi.string().required(),
});

const login = Joi.object().keys({
  un: Joi.string().required(),
  pwd: Joi.string().required(),
});

const changePassword = Joi.object().keys({
  pwd: Joi.string().required(),
  nPwd: Joi.string().required(),
});

const forgotPassword = Joi.object().keys({
  email: Joi.string().required(),
});

const resetPassword = Joi.object().keys({
  nPwd: Joi.string().required(),
});

const updateUser = Joi.object().keys({
  fn: Joi.string().required(),
  email: Joi.string().required(),
  add: Joi.string().required(),
});

const updateStatus = Joi.object().keys({
  _id: Joi.string().required(),
});

export default {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  updateUser,
  updateStatus,
};
