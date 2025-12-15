import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value !== value.toUpperCase();
      },
      message: (props) =>
        `${props.value} is not a valid title!, title should not entirely uppercase!`,
    },
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

notesSchema.plugin(mongoosePaginate);

export const NoteModal = mongoose.model("Note", notesSchema);
