import express from "express";
import { createUrl, deletelink, getAllinks, getStats} from "../controller/url.js";

const router = express.Router();
router.route('/links').post(createUrl).get(getAllinks)
router.route('/links/:id').get(getStats).delete(deletelink)
export default router;
