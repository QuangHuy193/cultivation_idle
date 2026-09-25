import { InferSchemaType, Schema, model, models } from "mongoose";
import { Rewards } from "./Code";

const DailyLoginSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    days: {
      type: [
        {
          day: {
            type: Number,
            required: true,
            min: 1,
            max: 30,
          },

          reward: {
            type: Rewards,
            required: true,
          },
        },
      ],
      default: [],
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export type IDailyLogin = InferSchemaType<typeof DailyLoginSchema>;

const DailyLogin =
  models.DailyLogin || model("DailyLogin", DailyLoginSchema);

export default DailyLogin;