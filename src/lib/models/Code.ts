import { InferSchemaType, Schema, model, models } from "mongoose";

export const Rewards = new Schema(
  {
    spiritStone: {
      type: Number,
      default: 0,
    },

    cultivation: {
      type: Number,
      default: 0,
    },

    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    equips: [
      {
        equipId: {
          type: Schema.Types.ObjectId,
          ref: "Equip",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    skills: [
      {
        skillsId: {
          type: Schema.Types.ObjectId,
          ref: "Skill",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    skins: [
      {
        skinsId: {
          type: Schema.Types.ObjectId,
          ref: "Skin",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { _id: false },
);

const CodeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    expire: {
      type: Date,
      required: true,
    },

    maxUses: {
      type: Number,
      default: null,
    },

    usedCount: {
      type: Number,
      default: 0,
    },

    reward: {
      type: Rewards,
      defaule: {},
    },
  },
  {
    timestamps: true,
  },
);

export type ICode = InferSchemaType<typeof CodeSchema>;

export type IRewards = InferSchemaType<typeof Rewards>;

const Code = models.Code || model("Code", CodeSchema);

export default Code;
