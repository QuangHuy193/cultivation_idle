import { InferSchemaType, Schema, model, models } from "mongoose";

const CharacterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    realmId: {
      type: String,
      ref: "Realm",
      default: "luyenkhi",
    },

    realmLevel: {
      type: Number,
      default: 1,
    },

    cultivation: {
      type: Number,
      default: 0,
    },

    cultivationPerSecond: {
      type: Number,
      default: 1,
    },

    spiritStone: {
      type: Number,
      default: 0,
    },

    stats: {
      hp: {
        type: Number,
        default: 100,
      },

      attack: {
        type: Number,
        default: 10,
      },

      defense: {
        type: Number,
        default: 5,
      },
    },

    equippedSkills: {
      type: [
        {
          skillId: String,
          slot: Number,
        },
      ],
      default: [],
    },

    equipments: {
      weapon: {
        type: Schema.Types.ObjectId,
        ref: "Equip",
      },

      helmet: {
        type: Schema.Types.ObjectId,
        ref: "Equip",
      },

      armor: {
        type: Schema.Types.ObjectId,
        ref: "Equip",
      },

      ring: {
        type: Schema.Types.ObjectId,
        ref: "Equip",
      },

      necklace: {
        type: Schema.Types.ObjectId,
        ref: "Equip",
      },

      boots: {
        type: Schema.Types.ObjectId,
        ref: "Equip",
      },
    },

    inventory: {
      equips: {
        type: [
          {
            equipId: {
              type: Schema.Types.ObjectId,
              ref: "Equip",
              required: true,
            },
          },
        ],
        default: [],
      },
      items: {
        type: [
          {
            itemId: {
              type: Schema.Types.ObjectId,
              ref: "Item",
              required: true,
            },
            quantity: { type: Number, default: 1, min: 0 },
          },
        ],
        default: [],
      },
      skills: {
        type: [
          {
            skillId: {
              type: String,
              ref: "Skill",
              required: true,
            },
            level: {
              type: Number,
              default: 1,
            },
            shard: {
              type: Number,
              default: 0,
            },
          },
        ],
        default: [],
      },
    },

    lastOnlineAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export type ICharacter = InferSchemaType<typeof CharacterSchema>;

const Character = models.Character || model("Character", CharacterSchema);

export default Character;
