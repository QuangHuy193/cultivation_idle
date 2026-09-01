import { InferSchemaType, Schema, model, models } from "mongoose";

const LogBattle = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    enemyName: {
      type: String,
      default: "",
    },
    dmg: {
      type: Number,
      default: 1,
    },

    skill: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const BattleSchema = new Schema(
  {
    characterId: {
      type: Schema.Types.ObjectId,
      ref: "Character",
      require: true,
    },

    battleType: {
      type: String,
      enum: ["mainStage", "wildMap"],
      default: "mainStage",
    },

    turn: {
      type: Number,
      required: true,
      default: 1,
    },

    playerHp: {
      type: Number,
      default: 1,
    },

    playerMaxHp: {
      type: Number,
      default: 1,
    },

    monster: {
      monsterId: {
        type: String,
        ref: "Monster",
      },

      name: String,

      hp: Number,

      maxHp: Number,

      atk: Number,

      def: Number,

      icon: String,
    },

    skills: [
      {
        skillId: {
          type: String,
          ref: "Skill",
        },

        currentCooldown: {
          type: Number,
          default: 0,
        },
      },
    ],

    battleStatus: {
      type: String,
      enum: ["fighting", "win", "lose"],
      default: "fighting",
    },

    logs: [LogBattle],

    mapId: {
      type: String,
      ref: "Map",
    },

    stage: Number,

    lastTurnAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export type IBattle = InferSchemaType<typeof BattleSchema>;

const Battle = models.Battle || model("Battle", BattleSchema);

export default Battle;
