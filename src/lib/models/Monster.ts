import { InferSchemaType, Schema, model, models } from "mongoose";

const MonsterSchema = new Schema({
  _id: String,

  name: String, 

  rarity: {
    type: String,
    default: "common",
  },

  icon: String,

  stats: {
    hp: Number,
    atk: Number,
    def: Number,
  },

  realmReward: {
    type: Number,
    default: 0,
  },

  spiritStoneReward: {
    type: Number,
    default: 0,
  },

  dropTable: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },

      chance: Number,
    },
  ],
});

export type IMonster = InferSchemaType<typeof MonsterSchema>;

export default models.Monster || model("Monster", MonsterSchema);
