import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Url } from "../model/url.js";
import ErrorHandler from "../utils/errorHandler.js";
import { generateCode } from "../utils/genrateCode.js";


export const createUrl= catchAsyncError(async(req,res,next)=>{
   
    const {url} = req.body
    if(!url) return next(new ErrorHandler("url is required", 400))
   
    const code = generateCode(7); 
      // check if code already exists
  const checkCodeexist = await Url.findOne({ codeId: code });

  // if it exists, throw error
  if (checkCodeexist) {
    return next(new ErrorHandler("code already exists, try again", 409));
  }

    const response = await Url.create(
    {
        codeId: code,
        redirectUrl: url,
        history:[]
    }
   )
   res.status(200).json({
    success: true,
    message: "link is created",
    data:response
  });
})

export const getAllinks = catchAsyncError(async(req,res,next)=>{
     const response = await Url.find()
        res.status(200).json({
        success: true,
        message: "all links",
        data:response
  });

})

export const getStats = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  const response = await Url.findOne({
    codeId:id
  })
  if (!response) {
    return next(new ErrorHandler("Invalid code. No stats found.", 404));
  }
 res.status(200).json({
        success: true,
        message: "all links",
        data:{
          totalClicks: response.history.length,
          history:response.history
        }
 })
})

export const deletelink = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  const response = await Url.deleteOne({
    codeId:id
  })
  if (!response.deletedCount) {
    return next(new ErrorHandler("link not found", 404));
  }
 res.status(200).json({
        success: true,
        message: "delete successfully !",
 })
})