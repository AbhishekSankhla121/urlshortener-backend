import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Url } from "../model/url.js";
import ErrorHandler from "../utils/errorHandler.js";

export const urlRedirect = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params
    const checkCodeexist = await Url.findOne({codeId:id})
    if(!checkCodeexist)return next(new ErrorHandler("no longer redirect.", 404))
    const response = await Url.findOneAndUpdate({ codeId:id },{$push:{
        history:{
            timestamp: Date.now()
        }
    }})
        res.redirect(response.redirectUrl)

})