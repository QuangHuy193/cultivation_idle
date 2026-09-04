import { InferSchemaType, Schema, model, models } from "mongoose";
import {  Droppable } from "./Map";

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

  droppable: {
    type: Droppable,
  },
});

export type IMonster = InferSchemaType<typeof MonsterSchema>;

export default models.Monster || model("Monster", MonsterSchema);
