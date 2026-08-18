import { InferSchemaType, Schema, model, models } from "mongoose";

const EquipSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: { // weapon, armor, helmet, ring, necklace, boots
      type: String,
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

    stats: {
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

    sellPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export type IEquip = InferSchemaType<typeof EquipSchema>;

const Equip = models.Equip || model("Equip", EquipSchema);

export default Equip;
