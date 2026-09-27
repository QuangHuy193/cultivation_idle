import { InferSchemaType, Schema, model, models } from "mongoose";
import { ITEM_TYPE, ITEM_USE_TYPE } from "../types/itemTypes";

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(ITEM_TYPE),
      required: true,
    },

    typeUse: {
      type: String,
      enum: [...Object.values(ITEM_USE_TYPE), null],
      default: null,
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
        atk: {
          type: Number,
          default: 0,
        },
        def: {
          type: Number,
          default: 0,
        },

        time: {
          type: {
            value: {
              type: Number,
              default: 0,
            },
            unit: {
              type: String,
              default: "minute",
            },
          },
          default: {
            value: 0,
            unit: "minute",
          },
        },
      },

      cultivationBonus: {
        cultivation: {
          type: Number,
          default: 0,
        },
        // dùng cho thẻ tăng tu vi theo cảnh giới
        cultivationMultipleForRealm: {
          type: [
            {
              order: { type: Number, required: true },
              multiple: { type: Number, required: true },
            },
          ],
          default: [],
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
