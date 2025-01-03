import express from "express"
import { verifyToken } from "../utils/verifyUser.js";
import { addNote,editNote,getAllNotes,deleteNote,Pin,searchNote } from "../controller/note.controller.js";


const router = express.Router();

router.post("/add",verifyToken,addNote);
router.post("/edit/:noteId",verifyToken,editNote);
router.get("/all",verifyToken,getAllNotes);
router.delete("/delete/:noteId",verifyToken,deleteNote);
router.put("/pin/:noteId",verifyToken,Pin);
router.get("/search",verifyToken,searchNote);

export default router