import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
const registerUser=asyncHandler(async(req,res)=>{
   //Take user details from frontend
   //validation-not empty
   //check if already exists:username,email
   //create user object
   //make entry in db
   //remove password and refreshToken
   //return res
   const {username,email,password,role}=req.body
   console.log("email:",email)
   if([username,email,password,role].some((field)=>field?.trim()===""))
    {
        throw new ApiError(400,"All fields are required")
    }
    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser)
        {
            throw new ApiError(409,"Username or email already exists")
        }
       const user= await  User.create({
            username:username.toLowerCase(),
            email,
            password,
            role
        })
        const createdUser= await User.findById(user._id).select("-password -refreshToken")
        if(!createdUser)
            {
                throw new ApiError(500,"Failed to create user")
            }
})
export default registerUser