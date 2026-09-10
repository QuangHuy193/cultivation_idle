import { InferSchemaType, Schema, model, models } from "mongoose";

// các cảnh giới nhỏ
const RealLevels = new Schema(
  {
    order: {
      type: Number,
    },

    name: {
      type: String,
    },

    cultivationRequired: {
      type: Number,
    },

    hpBonus: {
      type: Number,
      default: 0,
    },

    atkBonus: {
      type: Number,
      default: 0,
    },

    defBonus: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

const RealmSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
      unique: true,
    },

    maxLevel: {
      type: Number,
      default: 10,
    },

    levels: {
      type: [RealLevels],
    },
  },
  {
    timestamps: true,
  },
);

export type IRealm = InferSchemaType<typeof RealmSchema>;

const Realm = models.Realm || model("Realm", RealmSchema);

export default Realm;
