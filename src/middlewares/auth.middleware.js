import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  //In mobile apps we don't send cookies in the request hence for that we are using headers inside headers we have authorization and authoriaztion:Bearer <token> hence we are replacing the <Bearer> with empty string and extracting the token.
 try {
     const token =
       req.cookies?.accessToken ||
       req.header("Authorization")?.replace("Bearer", "");
       if(!token)
           {
               throw new ApiError(401,"Unauthorized request")
   
           }
           const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
           const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
           if(!user)
               {
                   throw new ApiError(401,"Invalid Access Token")
               }
               req.user=user;
               next()
 } catch (error) {
    throw new ApiError(401,error?.message || "Invalid Access Token")
 }
});
export default verifyJWT