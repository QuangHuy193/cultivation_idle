import { InferSchemaType, Schema, model, models } from "mongoose";

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String, // tiêu hao, buff,...
      required: true,
    },

    rarity: {
      type: String,
      default: "common",
    },

    level: {
      type: Number,
      default: 1,
    },

    icon: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    buff: {
      statBonus: {
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
      realmBonus: {
        realm: {
          type: Number,
          default: 0,
        },
      },
    },

    quantity: {
      type: Number,
      default: 0,
      max: 99,
    },

    sellPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export type IItem = InferSchemaType<typeof ItemSchema>;

const Item = models.Item || model("Item", ItemSchema);

export default Item;
