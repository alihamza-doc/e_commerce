import jwt from "jsonwebtoken";
import User from "../models/User.js";


const generateToken = (user) =>{
    return jwt.sign(
        {id:user._id , role: user.role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}

    );

};

//register controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Register body:", req.body);


  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//login controller

export const login = async (req,res)=>{
    const {email,password} = req.body

    try{

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({message:"Invalid Credentials"});
        }

        const token = generateToken(user);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token
        });
        }
        catch(err){
        res.status(500).json({message:err.message})
    }

};

