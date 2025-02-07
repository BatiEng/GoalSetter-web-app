import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc register user to the database
// @route POST /api/users
// @access public
export const registerUser = async (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  try {
    if (name === "" || email === "" || password === "") {
      res.status(400).json({
        success: false,
        message: "you have to provide all blank field",
      });
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(name)) {
      res.status(400).json({
        success: false,
        message: "name is not in correct form",
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.status(400).json({
        success: false,
        message: "email is not in correct form",
      });
    } else if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "password is too short it have to be more than 6 char",
      });
    } else {
      User.find({ email })
        .then((result) => {
          if (result.length) {
            res.status(400).json({
              success: false,
              message: "this user already exist in our DB",
            });
          } else {
            const saltRounds = 10;
            bcrypt
              .hash(password, saltRounds)
              .then((hashedPassword) => {
                const newUser = new User({
                  name,
                  email,
                  password: hashedPassword,
                });
                newUser
                  .save()
                  .then((result) => {
                    res.status(201).json({
                      success: true,
                      message: "user saved succesfully to the DB",
                      data: {
                        ...result._doc,
                        token: generateToken(result._doc._id),
                      },
                    });
                  })
                  .catch((err) => {
                    res.status(400).json({
                      success: false,
                      message: `error occured while saving user to the DB err: ${err}`,
                    });
                  });
              })
              .catch((err) => {
                res.status(400).json({
                  success: false,
                  message: `error occured while hashing password err: ${err}`,
                });
              });
          }
        })
        .catch((err) =>
          res.status(400).json({
            success: false,
            message: `error occured while checking whether user in our DB or not err: ${err}`,
          })
        );
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc login user to the app
// @route POST /api/users/login
// @access public
export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();
  try {
    if (email === "" || password === "") {
      res
        .status(400)
        .json({ success: false, message: "you have to provide all field" });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res
        .status(400)
        .json({ success: false, message: "email is not in a correct form" });
    } else {
      User.find({ email })
        .then((data) => {
          if (data.length) {
            const hashedPassword = data[0].password;
            bcrypt
              .compare(password, hashedPassword)
              .then((result) => {
                if (result) {
                  res.status(201).json({
                    success: true,
                    message: "user sign in succesfully",
                    data: {
                      _id: data[0]._id,
                      name: data[0].name,
                      email: data[0].email,
                      token: generateToken(data[0]._id),
                    },
                  });
                } else {
                  res.status(400).json({
                    success: false,
                    message: "invalid password",
                  });
                }
              })
              .catch((err) => {
                res.status(400).json({
                  success: false,
                  message: `error occured while comparing given password err:${err}`,
                });
              });
          } else {
            res.status(400).json({
              success: false,
              message: "this email is not exist in our DB",
            });
          }
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: `error occured while checking whether email in DB or not err: ${err}`,
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc generate JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc get user data
// @route GET /api/users/me
// @access private
export const getMe = async (req, res) => {
  const { _id, name, email } = req.user;
  try {
    res.status(200).json({
      success: true,
      message: "user data fetched succesfuly",
      user: { _id, name, email },
    });
  } catch (err) {
    console.log(err);
    res.send("get me erro");
  }
};
