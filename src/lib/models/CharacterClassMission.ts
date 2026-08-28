import { InferSchemaType, model, models, Schema } from "mongoose";

const CharacterClassMissionSchema = new Schema({
  characterId: {
    type: Schema.Types.ObjectId,
    ref: "Character",
  },

  missionId: {
    type: Schema.Types.ObjectId,
    ref: "ClassMission",
  },

  rarity: {
    type: String,
    default: "common",
  },

  quantity: Number,

  rewardExp: Number,

  status: {
    type: String,
    enum: ["pending", "completed", "claimed"],
    default: "pending",
  },

  date: String,
});

export type IClassMission = InferSchemaType<typeof CharacterClassMissionSchema>;

const CharacterClassMission =
  models.CharacterClassMission ||
  model("CharacterClassMission", CharacterClassMissionSchema);

export default CharacterClassMission;
