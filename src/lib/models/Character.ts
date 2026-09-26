import { InferSchemaType, Schema, model, models } from "mongoose";

const cultivationPerMinuteSchema = new Schema(
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

const InventorySchema = new Schema(
  {
    equips: {
      type: [
        {
          equipId: {
            type: Schema.Types.ObjectId,
            ref: "Equip",
            required: true,
          },
          quantity: { type: Number, default: 1, min: 0 },
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
      default: [
        {
          skillId: "tram_kich",
          level: 1,
          shard: 0,
        },
      ],
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
      default: [
        {
          skinId: "macdinh",
        },
      ],
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

    countChangeName: {
      type: Number,
      default: -2, // miễn phí đổi tên 3 lần
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

    cultivationPerMinute: {
      type: cultivationPerMinuteSchema,
      default: {},
    },

    // tu vi nhận khi off
    cultivationOffline: {
      type: Number,
      default: 0,
    },

    // số giờ đã off
    timeReawrdOffline: {
      type: Number,
      defalut: 0,
    },

    spiritStone: {
      type: Number,
      default: 0,
    },

    stats: {
      type: statsSchema,
      default: {
        base: {
          hp: 100,
          atk: 10,
          def: 5,
        },

        equips: {
          hp: 0,
          atk: 0,
          def: 0,
        },

        skins: {
          hp: 0,
          atk: 0,
          def: 0,
        },

        items: {
          hp: 0,
          atk: 0,
          def: 0,
        },

        realm: {
          hp: 0,
          atk: 0,
          def: 0,
        },

        class: {
          hp: 0,
          atk: 0,
          def: 0,
        },
      },
    },

    dailyLogin: {
      // tổng số ngày đăng nhập
      total: {
        type: Number,
        default: 1,
      },
      // lần đăng nhập tiếp theo sẽ nhận ngày nào
      rewardDay: {
        type: Number,
        default: 1,
        min: 1,
        max: 30,
      },
      // lần cuối nhận là khi nào
      lastClaimAt: {
        type: Date,
        default: null,
      },
    },

    equippedSkills: {
      type: [
        {
          skillId: String,
          slot: Number,
        },
      ],
      default: [
        {
          skillId: "tram_kich",
          slot: 1,
        },
      ],
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
      type: InventorySchema,
      default: {},
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
