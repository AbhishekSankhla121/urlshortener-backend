import express from "express";
import { urlRedirect } from "../controller/urlRedirect.js";

const router = express.Router();
router.route('/:id').get(urlRedirect)
export default router;
