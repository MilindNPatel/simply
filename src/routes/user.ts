import { Router } from "express";
import { userController } from "../controllers";
import { ROUTER_LINKS } from "../enum";
import { Auth, Validate } from "../middlewares";
import passport from "passport";
import { userSchame } from "../validations";

const userCont = new userController();

export default Router()
  .post(
    ROUTER_LINKS.USER.SIGNUP,
    Validate(userSchame.register),
    userCont.signup
  )
  .post(ROUTER_LINKS.USER.SIGNIN, Validate(userSchame.login), userCont.signin)
  .post(
    ROUTER_LINKS.USER.CHANGE_PASSWORD,
    Auth(passport),
    Validate(userSchame.changePassword),
    userCont.changePassword
  )
  .post(
    ROUTER_LINKS.USER.FORGOT_PASSWORD,
    Validate(userSchame.forgotPassword),
    userCont.forgotPassword
  )
  .post(
    ROUTER_LINKS.USER.RESET_PASSWORD,
    Validate(userSchame.resetPassword),
    userCont.resetPassword
  )
  .get(ROUTER_LINKS.USER.GET_USERS, Auth(passport), userCont.getUsers)
  .get(ROUTER_LINKS.USER.GET_USER_BY_ID, Auth(passport), userCont.getUserById)
  .put(
    ROUTER_LINKS.USER.UPDATE_USER,
    Auth(passport),
    Validate(userSchame.updateUser),
    userCont.updateUser
  )
  .post(
    ROUTER_LINKS.USER.UPDATE_STATUS,
    Auth(passport),
    Validate(userSchame.updateStatus),
    userCont.updateStatus
  );
