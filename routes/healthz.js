import express from "express";
import { getHelthz } from "../controller/healthz.js";

const router = express.Router();

router.route('/healthz').get(getHelthz);

export default router;
