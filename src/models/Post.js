import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
    trim: true,
    minlength: [5, "El título debe tener al menos 5 caracteres"],
    maxlength: [30, "El título no puede superar 30 caracteres"],
  },
  content: {
    type: String,
    required: [true, "El contenido es obligatorio"],
    trim: true,
    minlength: [10, "El contenido debe tener al menos 10 caracteres"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hashtags: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    trim: true,
    default: "",
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

export default mongoose.model("Post", postSchema);