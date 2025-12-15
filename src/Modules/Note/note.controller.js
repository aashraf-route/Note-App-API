import express from "express";
import * as noteServices from "./note.service.js";

const noteRouter = express.Router();

// 1- Create a new note
noteRouter.post("/", noteServices.createNote);

// 2- Update a single Note by its id
noteRouter.put("/:id", noteServices.updateNote);

// 3- Delete a single Note by its id
noteRouter.delete("/:id", noteServices.deleteNoteById);

// 4- Delete all notes for the logged-in user
noteRouter.delete("/", noteServices.deleteAllNotes);

// 5- Get a note by its id.
noteRouter.get("/:id", noteServices.getNoteById);

// 5- Get all notes.
noteRouter.get("/", noteServices.getAllNotes);

export default noteRouter;
