import User from "../model/User.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "user already registered! Login Instead" });
  }
const saltRounds=bcrypt.genSaltSync(10);

const hashedPassword= bcrypt.hashSync(password,saltRounds);

const user = new User({
    name,
    email,
    password:hashedPassword,
    blogs:[]
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};


export const login=async (req,res,next)=>{
    const {email,password}=req.body;

    let existingUser;
    try {
        existingUser=await User.findOne({email});
    } catch (error) {
        return console.log(err);
    }
    if(!existingUser)
    {
        return res.status(404).json({message:"user doesn't exist!"});
    }
    const checkPassword=bcrypt.compareSync(password,existingUser.password);
    if(checkPassword)
        return res.status(200).json({message:"login successfully!"});
    return res.status(400).json({message:"Incorrect Password"});
} 