import User from "../model/User.js";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/GenerateWebToken.js";

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

export const getUserById=async (req,res,next)=>{
  const id=req.params.id;
  let user;
  try{
   user=await User.findById(id)
  }
  catch(error)
  {
    console.log(error);}
  if(!user)
    return res.status(404).json({message:"user not found"});
  return res.status(200).json({user});
}

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ userId: newUser._id,token:generateToken(newUser._id), message: 'User registered successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Registration failed'});
  }
};


export const login=async (req,res,next)=>{
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    res.status(200).json({  userId: user._id,token:generateToken(user._id),message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
} 
