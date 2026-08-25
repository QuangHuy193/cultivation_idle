import { InferSchemaType, Schema, model, models } from "mongoose";

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

    cultivationRequired: {
      type: Number,
      required: true,
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
  {
    timestamps: true,
  },
);

export type IRealm = InferSchemaType<typeof RealmSchema>;

const Realm = models.Realm || model("Realm", RealmSchema);

export default Realm;