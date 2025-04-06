const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
//require('dotenv').config()
//req handler for user or author registration

const createUserOrStaff = async (req, res) => {
  //get users and authors collection object
  const usersCollectionObj = req.app.get("usersCollection");

  //get user or author
  const user = req.body;

  //check duplicate user

  //find user by username
  let dbuser = await usersCollectionObj.findOne({ username: user.username,mob_no:user.mob_no });
  if (dbuser != null) {
    return res.send({ message: "User already exists" });
  }

  //hash password
  const hashedPin = await bcryptjs.hash(user.security_pin, 7);
  //replace with hash password
  user.security_pin = hashedPin;

  //save user

  await usersCollectionObj.insertOne(user);
  res.send({ message: "User Created" });
};

const loginUserOrStaff = async (req, res) => {
  //get users and authors collection object
  const usersCollectionObj = req.app.get("usersCollection");

  //get user or author
  const userCred = req.body;
  //verify username of user
  let dbuser
  if(userCred.login_mode=="mobile"){
    dbuser = await usersCollectionObj.findOne({
        mob_no:+userCred.mob_no
      });
  }
  else{
    dbuser = await usersCollectionObj.findOne({
       aadhar_number:userCred.aadhar_number
      });
  }

    console.log(dbuser)

  if (dbuser == null) {
    return res.send({ message: "Invalid username" });
  } else {
    let status = await bcryptjs.compare(userCred.security_pin, dbuser.security_pin); //return bool value
    if (status == false) {
      return res.send({ message: "Invalid Security Pin" });
    } else {
      //create jwt token
      const signedtoken = jwt.sign({ username: dbuser.username }, "abcde", {
        expiresIn: "1d",
      });
      delete dbuser.password;
      res.send({ message: "Login success", token: signedtoken, user: dbuser });
    }
  }
};

module.exports = { createUserOrStaff, loginUserOrStaff };
