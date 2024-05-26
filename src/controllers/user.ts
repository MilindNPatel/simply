import { Request, Response } from "express";
import cryptoRandomString from "crypto-random-string";
import { hashSync, compareSync } from "bcrypt";
import { userModel } from "../models";
import { BaseController } from "./BaseControllers";
import { ROUTER_LINKS } from "../enum";
import { mailer } from "../lib";
import { templates } from "../helpers";

export default class User extends BaseController {
  constructor() {
    super();
  }

  public signup = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const { un, pwd } = body;
      const checkUser = await userModel.findOne({
        un,
      });
      if (checkUser) throw new Error("Email already exist");
      const hashPass = hashSync(pwd, this.salt);
      body.pwd = hashPass;
      body["isActive"] = true;
      const userData = new userModel(body);
      const createUser = await userData.save();
      if (!createUser) throw new Error("Error while saving data");
      createUser &&
        res.status(200).json({
          success: true,
          message: "User signup successfully",
          data: createUser,
        });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message,
      });
    }
  };

  public signin = async (req: Request, res: Response) => {
    try {
      const { un, pwd } = req.body;
      const checkEmail: any = await userModel.findOne({ un });
      if (!checkEmail) throw new Error("Cannot find user with this email");
      if (!checkEmail.isActive) throw new Error("User is inactive");
      const checkPassword = await compareSync(pwd, checkEmail.pwd);
      if (!checkPassword)
        throw new Error("Password is wrong, Please check again");
      let userData: any = {
        _id: checkEmail._id,
        email: checkEmail.email,
        un: checkEmail.un,
        hostName: req.headers.host,
        remoteIp: req.connection.remoteAddress,
      };
      const authToken = this.jwt.sign(userData, this.secretKey, {
        expiresIn: 604800, //     1 week
      });
      delete userData.remoteIp;
      delete userData.hostName;
      userData = {
        ...userData,
        fn: checkEmail.fn,
      };
      res.status(200).json({
        success: true,
        message: "User login successfully",
        data: userData,
        authToken,
      });
    } catch (error) {
      res.status(400).send({ error: true, message: error.message });
    }
  };

  public changePassword = async (req: Request, res: Response) => {
    try {
      const { password, newPassword } = req.body;
      const tokenData: any = await this.extractToken(req);
      const filter = { email: tokenData.email };
      const getUser: any = await userModel.findOne(filter);

      const checkPassword = compareSync(password, getUser.password);
      if (!checkPassword) throw new Error("Password is Wrong");

      if (checkPassword && password === newPassword)
        throw new Error("New Password And Old Password can not be same");

      const hashPassword = hashSync(newPassword, this.salt);
      const update = { password: hashPassword };
      const options = { new: true };
      const updatePassword = await userModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      if (!updatePassword) throw new Error("Password not updated");

      res.status(200).json({
        success: true,
        message: "Password change successfully",
      });
    } catch (error) {
      res.status(400).send({ error: true, message: error.message });
    }
  };

  public forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) throw new Error("Enter Email To Change Password");

      const token = cryptoRandomString({
        length: 20,
        type: "url-safe",
      });

      const date = new Date();
      const expTime = date.getTime() + 600000; // 10 min

      let filter = { email };
      let update = { expTime, token };
      let options = { new: true };

      const user = await userModel.updateMany(filter, update, options);

      if (!user) throw new Error("User Not Found");

      let path = `${ROUTER_LINKS.USERS}${ROUTER_LINKS.USER.RESET_PASSWORD}`;
      let hostName = req.headers.host;

      let link = `${hostName}${path}?token=${token}`;

      let template = await templates.resetPassword(link);

      if (!template) throw new Error("Template not found");

      let subject = "Reset Password";

      const sendMail = await mailer(email, template, subject);

      if (!sendMail) throw new Error("Error While Sending Mail");

      sendMail &&
        res.status(200).json({
          success: true,
          message: `Password Reset Link Sent to ${email}`,
        });
    } catch (error) {
      res.status(400).send({ error: true, message: error.message });
    }
  };

  public resetPassword = async (req: Request, res: Response) => {
    try {
      const { token } = req.query;
      const { newPassword } = req.body;

      if (!newPassword) throw new Error("Enter New Password");

      const verifyToken = await userModel.findOne(
        { token },
        { _id: 1, email: 1, token: 1, expTime: 1 }
      );
      if (!verifyToken) throw new Error("Link Not Valid");

      const { expTime, _id, email }: any = verifyToken;
      const date = new Date().getTime();

      if (date > expTime) throw new Error("Link Expired");

      const hashPassword = hashSync(newPassword, this.salt);

      let filter = { _id };
      let update = { password: hashPassword };
      let options = { new: true };
      const updatePassword = await userModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      updatePassword &&
        res.status(200).json({
          success: true,
          message: `Password Updated Successfully for ${email}`,
        });
    } catch (error) {
      res.status(400).send({ error: true, message: error.message });
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await userModel.find();
      if (!users) throw new Error("Error while getting users");
      res.status(200).send({
        success: true,
        message: "Users",
        data: users,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message,
      });
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const user = await userModel.findOne({ _id });
      if (!user) throw new Error("Error while getting user");
      res.status(200).send({
        success: true,
        message: "User",
        data: user,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message,
      });
    }
  };

  public updateUser = async (req: any, res: Response) => {
    try {
      const { body, params } = req;
      const tokenData: any = await this.extractToken(req);
      console.log(tokenData);
      const filter = params;
      const update = body;
      const options = { new: true };
      const updateUser: any = await userModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      res.status(200).json({
        success: true,
        message: "User Edited Successfully",
        data: updateUser,
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message,
      });
    }
  };

  public updateStatus = async (req: any, res: Response) => {
    try {
      const filter = req.body;
      const findUSer: any = await userModel.findOne(filter);
      if (!findUSer) throw new Error("Error while geting user data");
      const update = {
        isActive: !findUSer.isActive,
      };
      const options = { new: true };
      const updateStatus = await userModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      if (!updateStatus) throw new Error("Error while updateing status");
      res.status(200).send({
        success: true,
        message: "User Status Updated Successfully",
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        message: error.message,
      });
    }
  };
}
