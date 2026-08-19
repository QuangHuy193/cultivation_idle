import { InferSchemaType, model, models, Schema } from "mongoose";

const MapSchema = new Schema({
  _id: String,

  name: String,

  order: Number,

  requiredRealm: {
    type: String,
    ref: "Realm",
  },

  monsterStatMultiplier: {
    type: Number,
    default: 1,
  },

  rewardMultiplier: {
    type: Number,
    default: 1,
  },

  monsters: [
    {
      monsterId: {
        type: String,
        ref: "Monster",
      },

      weight: Number, // tỉ lệ ra của quái đó
    },
  ],
});

export type IMap = InferSchemaType<typeof MapSchema>;

export default models.Map || model("Map", MapSchema);
