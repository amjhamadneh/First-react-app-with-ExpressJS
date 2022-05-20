const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/auth");
const { sign } = require("jsonwebtoken"); 

// to register user
router.post("/register", async (req, res) => {
  const { username, password, email, phone } = req.body; // data
  // to hash password using bcrypt
    bcrypt.hash(password, 12).then((hash) => {
      try{
        //create user
        Users.create({
          username: username,
          email: email,
          password: hash,
          phone: phone,
        });
        res.json("sucess");
      }
      catch(err){
        return res.json({ error: err });
      }
    });
});

// to login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body; // data

  //get user from table 
  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" }); // check if user is exists !

  //if exists !
  // compare password 
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Password not correct" }); // if password is not correct

    //if password correct
    //create token using sign
    const accessToken = sign(
      { username: user.username, id: user.id },
      "secret"
    );
    res.json(accessToken);
  });
});

// to check if auth or not 
// i used it with navbar to hide login and registeration when logged in 
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;