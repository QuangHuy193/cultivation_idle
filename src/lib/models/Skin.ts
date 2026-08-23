import { model, models, Schema } from "mongoose";

const SkinSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    bg: {
      type: String,
      required: true,
    },

    rarity: {
      type: String,
      default: "common",
    },

    price: {
      number: {
        type: Number,
        default: 1000,
      },
      unity: {
        type: String,
        default: "linhthach",
      },
    },

    buffs: {
      hp: {
        type: Number,
        default: 0,
      },

      attack: {
        type: Number,
        default: 0,
      },

      defense: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default models.SkinSchema || model("Skin", SkinSchema);
