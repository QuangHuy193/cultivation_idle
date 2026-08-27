import { model, models, Schema } from "mongoose";

const ClassSchema = new Schema({
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

  typeSkillBuff: String, // loại skill buff ex:sword, ....

  levels: [
    {
      level: Number,

      name: String,

      requiredExp: Number,

      buffs: {
        hp: Number,

        atk: Number,

        def: Number,

        skill: Number,
      },
    },
  ],
});

const Class = models.Class || model("Class", ClassSchema);

export default Class;
