import { NoteModal } from "../../DB/Models/note.model.js";
import { responseHandler } from "../../Utils/Common/responseHandler.js";
import httpStatus from "../../Utils/Common/httpStatus.js";
import _ from "mongoose-paginate-v2";

// 1
export const createNote = async (req, res, next) => {
  const { title, content } = req.body;

  // 1- create a new note
  const newNote = new NoteModal({
    title,
    content,
  });

  await newNote.save();
  return responseHandler(res, "Note created", httpStatus.CREATED);
};

// 2
export const updateNote = async (req, res, next) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  const updatedNote = await NoteModal.findByIdAndUpdate(
    noteId,
    { title, content, updatedAt: Date.now() },
    { new: true }
  );

  if (!updatedNote) {
    return responseHandler(res, "Note not found", httpStatus.NOT_FOUND);
  }

  return responseHandler(res, "Note updated successfully", httpStatus.OK, {
    note: updatedNote,
  });
};

// 3
export const deleteNoteById = async (req, res, next) => {
  const noteId = req.params.id;

  const deletedNote = await NoteModal.findByIdAndDelete(noteId);

  if (!deletedNote) {
    return responseHandler(res, "Note not found", httpStatus.NOT_FOUND);
  }

  return responseHandler(res, "Note deleted successfully", httpStatus.OK, {
    note: deletedNote,
  });
};

// 4

export const getNoteById = async (req, res, next) => {
  const noteId = req.params.id;
  const note = await NoteModal.findById(noteId);

  if (!note) {
    return responseHandler(res, "Note not found", httpStatus.NOT_FOUND);
  }

  return responseHandler(res, "Note retrieved successfully", httpStatus.OK, {
    note,
  });
};

// 5
export const getAllNotes = async (req, res, next) => {
  // const notes = await NoteModal.find({
  //   title: 1,
  //   content: 1,
  //   createdAt: 1,
  //   updatedAt: 1,
  // });
  const notes = await NoteModal.find(
    {},
    {
      title: 1,
      content: 1,
      createdAt: 1,
      updatedAt: 1,
    }
  );
  if (notes.length === 0) {
    return responseHandler(res, "No notes found for the user", httpStatus.OK, {
      notes: [],
    });
  }
  return responseHandler(res, "Notes retrieved successfully", httpStatus.OK, {
    notes,
  });
};

// 11
export const deleteAllNotes = async (req, res, next) => {
  const deletedNotes = await NoteModal.deleteMany();

  if (deletedNotes.deletedCount === 0) {
    return responseHandler(
      res,
      "No notes found for the user",
      httpStatus.NOT_FOUND
    );
  }

  return responseHandler(res, "All notes deleted successfully", httpStatus.OK);
};
