const UserModel = require("../models/User");
const FaultModel = require("../models/Fault");
const jwt = require("jsonwebtoken");
const PermissionModel = require("../models/Permission");

require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const maxAge = 1*24*60*60;
const createToken = (id, name, email) => {
  return jwt.sign({ id, name, email },  jwtSecretKey, {
    expiresIn: maxAge
  })
}
 const handleErrors = (err) => {
    let errors = {email: "", password: ""}
    
    if(err.message === "Incorrect Email") errors.email = "That email is not registered";
    if(err.message === "Incorrect Password") errors.password = "Entered Password is Incorrect";
    if(err.code===11000){
        errors.email = "Email is registered";
        return errors; 
    }
    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
 }
module.exports.register = async (req, res, next) => {
    try{
        const { name, email, password, role } = req.body
        console.log(req.body)
       const user = await UserModel.create({name, email, password, role});
       const token = createToken(user._id);
       res.cookie("jwt",token, {
           withCredentials: true,
           httpOnly: false,
           maxAge: maxAge * 1000,
       } );
       res.status(201).json({user: user._id, created: true})
       }catch(err) {
         console.log(err);
         const errors = handleErrors(err);
         res.json({errors,created: false})
       }
};

module.exports.login = async (req, res, next) => {

  try{
    const {  email, password } = req.body
   const user = await UserModel.login( email, password);
   const token = createToken(user._id,  user.name, user.email);
   res.cookie("jwt",token, {
       withCredentials: true,
       httpOnly: false,
       maxAge: maxAge * 1000,
   } );
   res.status(200).json({user: user._id, name: user.name, role: user.role, message: "Cookie Created"})
   }catch(err) {
     console.log(err);
     const errors = handleErrors(err);
     res.json({errors,created: false})
   }

};



module.exports.view = async (req, res, next) => {
  try {
    const { name, stream } = req.body;


    const query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (stream) {
      query.stream = stream;
    }

    const faults = await FaultModel.find(query);

    console.log("Name:", name, "Stream:", stream);
    
    if (faults.length > 0) {
      res.json(faults);
    } else {
      res.json({ message: "No faults found with the given criteria." });
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching data from MongoDB." });
  }
}
module.exports.perm = async (req, res, next) => {
  try {
    const { name, stream } = req.body;
    console.log("Received parameters:", { name, stream });

const query = {};
if(name) {
  query.name = { $regex: name, $options: "i" };
}
if (stream) {
  query.stream = stream;
}
const perms = await PermissionModel.find(query);
console.log("Name:", name, "Stream:", stream)
if(perms.length > 0 ){
  res.json(perms);
}else{
  res.json({ message: "No permissions found with the given criteria." });
}
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching data from MongoDB." });
  }

}


