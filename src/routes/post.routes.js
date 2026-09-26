import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.index.bind(postController));
router.get("/new", postController.createForm.bind(postController));
router.post("/", postController.create.bind(postController));

router.get("/:id/edit", postController.editForm.bind(postController));
router.post("/:id", postController.update.bind(postController));
router.post("/:id/delete", postController.delete.bind(postController));

export default router;