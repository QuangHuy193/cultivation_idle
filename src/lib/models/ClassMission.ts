import { InferSchemaType, model, models, Schema } from "mongoose";

const ClassMissionSchema = new Schema({
  name: String,

  description: String,

  itemId: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },

  baseQuantity: {
    type: Number,
    default: 1,
  },

  expReward: {
    type: Number,
    default: 10,
  },
});

export type IClassMission = InferSchemaType<typeof ClassMissionSchema>;

const ClassMission =
  models.ClassMission || model("ClassMission", ClassMissionSchema);

export default ClassMission;
