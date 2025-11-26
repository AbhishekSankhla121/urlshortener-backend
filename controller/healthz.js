import { catchAsyncError } from "../middlewares/catchAsyncError.js";

export const getHelthz = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "backend service is working",
    "ok": true, 
    "version": "1.0"
  });
});
