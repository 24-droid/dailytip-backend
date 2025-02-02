import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken //This is used to save the refresh token in database
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch(error) {
        throw new ApiError(500,"Something got wrong while generating access and refresh token ")
    }

}
const registerUser=asyncHandler(async(req,res)=>{
   //Take user details from frontend
   //validation-not empty
   //check if already exists:username,email
   //create user object
   //make entry in db
   //remove password and refreshToken
   //return res
   const {username,email,password,role='Developer'}=req.body
   console.log(req.body)
   console.log("email:",email)
   if([username,email,password,role].some((field)=>field?.trim()===""))
    {
        throw new ApiError(400,"All fields are required")
    }
    const existedUser= await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser)
        {
            throw new ApiError(409,"Username or email already exists")
        }
       const user= await  User.create({
            username,
            email,
            password,
            role
        })
        const createdUser= await User.findById(user._id).select("-password -refreshToken")
        if(!createdUser)
            {
                throw new ApiError(500,"Failed to create user")
            }
            return res.status(201).json(new ApiResponse(200,createdUser,"User Registered Successfully"))
})
const loginUser= asyncHandler(async(req,res)=>{
    //email from req.body
    // find the user
    //password check
    //generate refresh and access token
    //send cookies
    const {email,password}=req.body
    console.log("Login user email",email);
    if(!email || !password)
        {
            throw new ApiError(400,"Email and Password are required")
        }
    const user=await User.findOne({email})
    if(!user)
        {
            throw new ApiError(404,"User not found!")
        }
        const isPasswordValid=user.isPasswordCorrect(password)
        if(!isPasswordValid)
            {
                throw new ApiError(404,"Password doesn't match")
            }
       const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
       const loggedInUser= await User.findById(user._id).select("-password -refreshToken")
       const options={
        httpOnly:true,
        secure:true
       }
       return res
       .status(200)
       .cookie("refreshToken",refreshToken,options)
       .cookie("accessToken",accessToken,options)
       .json(
         new ApiResponse(
            200,
            {user:loggedInUser,refreshToken,accessToken},
            "User logged In Successfully"
         )
       )
})
const logoutUser=asyncHandler(async(req,res)=>{
 await User.findByIdAndUpdate(
    req.user._id,
    {
        $set:{
            refreshToken:undefined
        }
    },
    {
        new:true
    }
 )
 const options={
    httpOnly:true,
    secure:true
   }
   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new ApiResponse(200,{},"User Logout"))
})
const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken||req.body.refreshToken
    if(!incomingRefreshToken)
        {
            throw new ApiError(401,"Unauthorized Request")
        }
       try {
        const decodedToken= jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user= await User.findById(decodedToken?.id);
        if(!user)
         {
             throw new ApiError(401,"Invalid Refresh Token");
         }
         if(incomingRefreshToken!==user.refreshToken)
             {
                 throw new ApiError(401,"Refresh token is expired or used");
             }
             const options={
                 httpOnly:true,
                 secure:true
                }
           const {accessToken,newRefreshToken}= await generateAccessAndRefreshToken(user._id);
           return res
           .status(200)
           .cookie("accessToken",accessToken,options)
           .cookie("refreshToken",newRefreshToken,options)
           .json(
             new ApiResponse(
                 200,
                 {refreshToken:newRefreshToken,accessToken},
                 "User Access Token Refreshed Successfully"
             )
           )
       } catch (error) {
         throw new ApiError(401,"Invalid Refresh Token")
       }

})
export  {registerUser,loginUser,logoutUser,refreshAccessToken}