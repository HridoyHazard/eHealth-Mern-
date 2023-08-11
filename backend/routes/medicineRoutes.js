import express from "express";
const router = express.Router();
import {
  getMedicineById,
  getMedicines,
} from "../controller/medicineController.js";

router.route("/").get(getMedicines);
router.route("/:id").get(getMedicineById);
export default router;
