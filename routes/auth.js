const express = require("express");
const router = express.Router();

const { signout, signup, signin, isSignedIn } = require("../controllers/auth"); // .. means go one folder back, because currentle we were in routes folder
const { check, validationResult } = require("express-validator");

router.post(
    "/signup",
    [
        check("name")
            .isLength({ min: 3 })
            .withMessage("Name should be of minimum 3 charaters!"),
        check("email").isEmail().withMessage("Please enter correct email!"),
        check("password")
            .isLength({ min: 3 })
            .withMessage("Password should be of minimum 3 charaters!"),
    ],
    signup
);

router.post(
    "/signin",
    [
        check("email").isEmail().withMessage("Email is required!"),
        check("password")
            .isLength({ min: 3 })
            .withMessage("Password is required!"),
    ],
    signin
);
router.get("/signout", signout);

//test-routes
// router.get("/testroute", isSignedIn, (req, res) => {
//     return res.json(req.auth);
// });

module.exports = router;
