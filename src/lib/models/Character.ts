import { InferSchemaType, Schema, model, models } from "mongoose";

const cultivationPerSecondSchema = new Schema(
  {
    base: {
      type: Number,
      default: 1,
    },

    fromMap: {
      type: Number,
      default: 0,
    },

    fromItem: {
      type: Number,
      default: 0,
    },

    fromVip: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const currentMapSchema = new Schema(
  {
    map: {
      type: String,
      ref: "Map",
    },
    stage: {
      type: Number,
      default: 1,
    },
  },
  {
    _id: false,
  },
);

const statsSchema = new Schema(
  {
    base: {
      hp: {
        type: Number,
        default: 100,
      },

      atk: {
        type: Number,
        default: 10,
      },

      def: {
        type: Number,
        default: 5,
      },
    },

    equips: {
      hp: {
        type: Number,
        default: 0,
      },

      atk: {
        type: Number,
        default: 0,
      },

      def: {
        type: Number,
        default: 0,
      },
    },

    skins: {
      hp: {
        type: Number,
        default: 0,
      },

      atk: {
        type: Number,
        default: 0,
      },

      def: {
        type: Number,
        default: 0,
      },
    },

    items: {
      hp: {
        type: Number,
        default: 0,
      },

      atk: {
        type: Number,
        default: 0,
      },

      def: {
        type: Number,
        default: 0,
      },
    },

    realm: {
      hp: {
        type: Number,
        default: 0,
      },

      atk: {
        type: Number,
        default: 0,
      },

      def: {
        type: Number,
        default: 0,
      },
    },

    class: {
      hp: {
        type: Number,
        default: 0,
      },

      atk: {
        type: Number,
        default: 0,
      },

      def: {
        type: Number,
        default: 0,
      },      
    },
  },
  {
    _id: false,
  },
);

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

    skinId: {
      type: String,
      ref: "Skin",
      default: "macdinh",
    },

    class: {
      classId: {
        type: String,
        ref: "Class",
        default: "",
      },
      classLevelCharacter: {
        type: Number,
        default: 1,
      },
      exp: {
        type: Number,
        default: 0,
      },
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
      type: cultivationPerSecondSchema,
      default: {},
    },

    spiritStone: {
      type: Number,
      default: 0,
    },

    stats: {
      type: statsSchema,
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

    currentMap: {
      type: currentMapSchema,
      default: {},
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
      skins: {
        type: [
          {
            skinId: {
              type: String,
              ref: "Skin",
              required: true,
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
