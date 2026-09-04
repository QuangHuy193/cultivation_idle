import { InferSchemaType, model, models, Schema } from "mongoose";

const MapSchema = new Schema({
  _id: String,

  name: String,

  icon: String,

  order: Number,

  maxStage: {
    type: Number,
    default: 1,
  },

  // bouns khi hoàn thành
  cultivationPerMinuteBouns: {
    type: Number,
    default: 1,
  },

  requiredRealm: {
    type: String,
    ref: "Realm",
  },

  monsterStatMultiplier: {
    type: Number,
    default: 1,
  },

  stages: [
    {
      stage: Number,

      monsterId: {
        type: String,
        ref: "Monster",
      },

      firstClearReward: {
        spiritStone: {
          type: Number,
          default: 0,
        },

        cultivation: {
          type: Number,
          default: 0,
        },

        rewards: {
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
              skillId: {
                type: String,
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
              skinId: {
                type: String,
                ref: "Skin",
              },
              quantity: {
                type: Number,
                default: 1,
              },
            },
          ],
        },
      },
    },
  ],
});

export type IMap = InferSchemaType<typeof MapSchema>;

export default models.Map || model("Map", MapSchema);
