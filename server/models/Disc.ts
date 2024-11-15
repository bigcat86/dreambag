const { Schema, model } = require("mongoose");

const discSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    speed: {
        type: Number,
        required: true
        },
    glide: {
        type: Number,
        required: true
        },
    turn: {
        type: Number,
        required: true
        },
    fade: {
        type: Number,
        required: true
        },
    image: {
        type: String,
        required: false
        },
    },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Disc = model("Disc", discSchema);

export default Disc;
