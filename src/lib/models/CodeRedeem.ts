import { model, models, Schema } from "mongoose";

const CodeRedeemSchema = new Schema(
  {
    codeId: {
      type: Schema.Types.ObjectId,
      ref: "Code",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    redeemedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

CodeRedeemSchema.index(
  {
    codeId: 1,
    userId: 1,
  },
  {
    unique: true,
  },
);

export default models.CodeRedeem || model("CodeRedeem", CodeRedeemSchema);
