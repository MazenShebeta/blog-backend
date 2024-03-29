const userModel = require("../models/user.model");
const emailController = require("./email.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class auth {
  // Register
  static async register(req, res) {
    try {
      // Create a new user based on the request body
      const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
      });

      // Set the profile picture if provided in the request body
      if (req.body.image) {
        user.image = req.body.image;
      } else {
        // Set the default profile picture based on the user's gender if not provided
        if (req.body.gender === "male") {
          user.image =
            "https://firebasestorage.googleapis.com/v0/b/art-commerce-e662f.appspot.com/o/artist_male.png?alt=media&token=6adc0394-2e67-4fc7-9a2a-c33418434e1d";
        } else if (req.body.gender === "female") {
          user.image =
            "https://firebasestorage.googleapis.com/v0/b/art-commerce-e662f.appspot.com/o/artist_female.png?alt=media&token=be3aeef9-a7d8-4491-8f84-810803ec80dc";
        }
      }

      // Generate a verification token and set it for the user
      const verificationToken = await user.generateVerificationToken();
      user.emailVerificationCode = verificationToken;

      // Save the user to the database
      const savedUser = await user.save();

      // Send a verification email to the user's email address
      const emailResponse = await emailController.sendVerificationMail(
        verificationToken,
        savedUser.email
      );

      // Return a success message to the client
      res.status(201).json({
        message: "User created successfully",
        emailMessage: emailResponse,
      });
    } catch (error) {
      // Handle any errors that occur during the registration process
      res.status(400).json({ message: error.message });
    }
  }

  // Login
  static async login(req, res) {
    try {
      // find user by email
      const user = await userModel.findOne({ email: req.body.email });

      if (!user) {
        res.status(404).json({message: "User not found"});
      }

      // check password
      const isMatch = await user.checkPassword(req.body.password);

      if (!isMatch) {
        res.status(401).json({message: "Invalid Password"});
      }

      if (!user.verified) {
        const verificationToken = await user.generateVerificationToken();
        user.emailVerificationCode = verificationToken;

        // Save the user to the database
        const savedUser = await user.save();

        // Send a verification email to the user's email address
        await emailController.sendVerificationMail(
          verificationToken,
          savedUser.email
        );
        res.status(300).json({message: "Verification email has been re-sent"});
      } else {
        // generate token
        const token = await user.generateAuthToken();
        const userData = {
          id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
          role: user.role,
        };
        res.status(200).json({ token, userData });
      }
    } catch (error) {
      // if error occurs, return error message
      res.status(400).json({ message: error.message });
    }
  }

  static async forgotPassword(req, res) {
    // done tested
    try {
      const email = req.body.email;
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(404).json({message: "Email not found!"});
      }
      const passwordToken = await user.generatePasswordReset();
      await emailController.sendForgotPasswordEmail(passwordToken, email);
      user.passwordVerificationCode = passwordToken;
      await user.save();
      res.status(200).json({message: "Password reset email has been sent"});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async resetPassword(req, res) {
    // done tested
    try {
      const user = await userModel.findOne({
        passwordVerificationCode: req.params.token,
      });
      if (!user) {
        res.status(401).json({message: "Invalid token!"});
      }
      user.password = req.body.password;
      user.passwordVerificationCode = null;
      user.tokens = []
      await user.save();
      res.status(200).json({message: "Password reset successfuly"});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    // done tested
    try {
      const token = req.token;
      //delete token from database
      const user = req.user;
      await user.deleteTokenFromDatabase(req.user, token);
      res.status(200).json({message: "logged out successfully"});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async verifyEmail(req, res) {
    // done tested
    try {
      const token = req.params.token;
      const id = jwt.verify(token, process.env.JWT_SECRET)._id;
      const user = await userModel.findById(id);

      if (!user) {
        res.status(404).json({message: "User not found!"});
      }
      if (user.verified === true) {
        res.status(401).json({message: "User already verified!"});
      }
      if (user.emailVerificationCode != token) {
        res.status(401).json({message: "Invalid token!"});
      }
      user.verified = true;
      await user.save();
      res.status(200).json({message: "User verified successfully"});
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }

  static async resendVerificationEmail(user) {
    // done tested
    try {
      const verificationToken = await user.generateVerificationToken();
      user.emailVerificationCode = verificationToken;
      await user.save();
      await emailController.sendVerificationMail(verificationToken, user.email);
      return true;
    } catch (error) {
      return error;
    }
  }
}

module.exports = auth;
