import express from "express";
const router = express.Router();

import { getBloodById,getBloods } from "../controller/bloodController.js";

router.route('/').get(getBloods)
router.route('/:id').get(getBloodById)


export default router;
