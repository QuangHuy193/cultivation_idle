import { InferSchemaType, Schema, model, models } from "mongoose";
import { Rewards } from "./Code";

export const MAIL_STATUS = {
  DELETE: -1,
  UNREAD: 0,
  READ: 1,
  CLAIMED: 2,
} as const;

const MailboxSchema = new Schema(
  {
    characterId: {
      type: Schema.Types.ObjectId,
      ref: "Character",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      default: "",
    },

    status: {
      type: Number,
      enum: Object.values(MAIL_STATUS),
      default: MAIL_STATUS.UNREAD,
    },
    
    reward: {
      type: Rewards,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

MailboxSchema.index({
  characterId: 1,
  status: 1,
});

MailboxSchema.index({
  characterId: 1,
  createdAt: -1,
});

export type IMailbox = InferSchemaType<typeof MailboxSchema>;

const Mailbox = models.Mailbox || model("Mailbox", MailboxSchema);

export default Mailbox;
