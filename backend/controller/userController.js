import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import SendEmailUtility from "../utils/sendEmailUtility.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let data = {};

  const user = await User.findOne({ email });
  if (user.isVerified === true) {
    if (user && (await user.matchPassword(password))) {
      try {
        const r = await axios.get("https://api.chatengine.io/users/me/", {
          headers: {
            "Project-ID": "62473f79-e6d1-4edc-b491-cce29f68da41",
            "User-Name": user.name,
            "User-Secret": password,
          },
        }) .then((r) => {
          let data = { ...r.data };
          if (data.hasOwnProperty("secret")) {
            data.secret = password;
          }
          return data;
        });
        data =  r;
      } catch (e) {
        console.log(e);
      }
      generateToken(res, user._id);
      res.json({  
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        ...data,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Please active your account");
  }
});

// @desc    forget user password & get token
// @route   POST /api/users/forgetpassword
// @access  Public
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email: email });

  console.log(user);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!");
  }
  const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
    expiresIn: "1d",
  });

  // console.log(user);
  // console.log(token);
  // console.log(req.body);

  let EmailSubject = "Reset Password Link";
  let EmailText = `<p> Hi ${user.name} </p>
  <br> Please <a href="http://localhost:3000/resetpassword/${user._id}/${token}">Click Here</a> To  Reset Your Password </br>`;
  let EmailTo = email;

  await SendEmailUtility(EmailTo, EmailText, EmailSubject);
});

// @desc    forget user password & get token
// @route   POST /api/users/resetpassword/:id/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  console.log(token);

  console.log(password);

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const username = name;
  const secret = password;
  const first_name = name;
  const last_name = "";

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    try {
      const r = await axios
        .post(
          "https://api.chatengine.io/users/",
          { username, secret, email, first_name, last_name },
          { headers: { "PRIVATE-KEY": "8f2bfa20-9e3c-47ad-ab24-267d6c868d56" } }
        )
        .then((r) => {
          let data = { ...r.data };
          if (data.hasOwnProperty("secret")) {
            data.secret = password;
          }
          console.log(data);
          return data;
        });
      console.log("register data:", r);
    } catch (e) {
      console.log(e);
    }
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
    expiresIn: "1d",
  });

  user.isToken = token;
  await user.save();

  let EmailSubject = "Active Account Link";
  let EmailText = `<p> Hi ${user.name} </p>
  <br> Please <a href="http://localhost:3000/active/${token}">Click Here</a> To  Active Your Account </br>`;
  let EmailTo = email;

  await SendEmailUtility(EmailTo, EmailText, EmailSubject);
});

// @desc    Active user account
// @route   Get /api/users/active/:token
// @access  Public

const activeUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log(token);
  try {
    const user = await User.findOne({ isToken: token });
    if (user) {
      user.isVerified = true;
      user.isToken = "";
      await user.save();
      console.log("verified");
    }
  } catch (error) {
    console.log(error);
  }

  // if (token) {
  //   console.log("token paise");
  //   const user = await User.findByIdAndUpdate(
  //     { _id: token.id },
  //     { isVerified: true }
  //   );
  // }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  forgetPassword,
  resetPassword,
  registerUser,
  logoutUser,
  activeUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
