const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login", isLoggedIn: false });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password does not match");
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect("/");
  } catch (err) {
    res.render("auth/login", {
      pageTitle: "Login",
      isLoggedIn: false,
      errorMessages: [err.message],
    });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { pageTitle: "Signup", isLoggedIn: false });
};

exports.postSignup = [
  // First Name Validator
  check("firstName")
    .notEmpty()
    .withMessage("First name is mandatory")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name should be minimum 2 chars")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First Name should only contain english alphabets"),

  // Last Name Validator
  check("lastName")
    .notEmpty()
    .withMessage("Last name is mandatory")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last Name should be minimum 2 chars")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Last Name should only contain english alphabets"),

  // Email validator
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  // Password Validator
  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password Name should be minimum 8 chars")
    .matches(/[a-z]/)
    .withMessage("Password should have atleast one small alphabet")
    .matches(/[A-Z]/)
    .withMessage("Password should have atleast one capital alphabet")
    .matches(/[!@#$%^&*_":?]/)
    .withMessage("Password should have atleast one special character")

    // Confirm_Password Validator
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),

  // User Type Validator
  check("userType")
    .trim()
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("User type is invalid"),

  // Terms and Conditions Validator
  check("terms")
    .notEmpty()
    .withMessage("Terms and Conditions must be accepted"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: false,
        errorMessages: errors.array().map((err) => err.msg),
        oldInput: req.body,
      });
    }

    const { firstName, lastName, email, password, userType } = req.body;

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
      });

      user
        .save()
        .then((result) => {
          res.redirect("/login");
        })
        .catch((error) => {
          return res.status(422).render("auth/signup", {
            pageTitle: "Signup",
            isLoggedIn: false,
            errorMessages: [error],
            oldInput: req.body,
          });
        });
    });
  },
];
