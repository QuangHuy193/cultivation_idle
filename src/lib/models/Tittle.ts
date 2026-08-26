import { model, models, Schema } from "mongoose";

const TitleSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  icon: String,

  description: String,

  levels: [
    {
      level: Number,

      requiredExp: Number,

      buffs: {
        hp: Number,

        atk: Number,

        def: Number,

        skill: String, // loại skill buff
      },
    },
  ],
});

const Tittle = models.Tittle || model("Skin", TitleSchema);

export default Tittle;
