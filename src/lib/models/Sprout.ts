import { InferSchemaType, Schema, model, models } from "mongoose";

export const SproutStatSchema = new Schema(
  {
    hp: {
      type: Number,
      default: 0,
    },

    atk: {
      type: Number,
      default: 0,
    },

    def: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const SproutLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxStatLevel: {
      type: Number,
      required: true,
      default: 10,
    },
    statPerLevel: {
      type: SproutStatSchema,
      required: true,
    },
    goldCostPerLevel: {
      type: Number,
      required: true,
    },
    itemCostPerLevel: {
      type: {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      default: null,
    },
  },
  {
    _id: false,
  },
);

const SproutSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    maxLevel: {
      type: Number,
      required: true,
      default: 5,
    },
    levels: {
      type: [SproutLevelSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export type ISprout = InferSchemaType<typeof SproutSchema>;

export default models.Sprout || model("Sprout", SproutSchema);
