import { InferSchemaType, Schema, model, models } from "mongoose";

const SkillLevelSchema = new Schema(
  {
    level: {
      type: Number,
      required: true,
    },

    attackPower: {
      type: Number,
      required: true,
      // % ATK của nhân vật
    },

    upgradeCost: {
      type: Number,
      required: true,
      // số mảnh cần để nâng lên cấp này
    },
  },
  {
    _id: false,
  }
);

const SkillSchema = new Schema(
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

    description: {
      type: String,
      required: true,
    },

    cooldown: {
      type: Number,
      required: true,
    },

    rarity: {
      type: String,
      default: "common",
    },

    maxLevel: {
      type: Number,
      default: 10,
    },

    levels: {
      type: [SkillLevelSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export type ISkill = InferSchemaType<typeof SkillSchema>;

const Skill = models.Skill || model("Skill", SkillSchema);

export default Skill;