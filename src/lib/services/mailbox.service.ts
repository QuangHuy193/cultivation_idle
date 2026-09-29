import {
  getMailboxAPI,
  readMailboxAPI,
  rewardMailboxAPI,
} from "@/app/axios/mailboxAPI";
import { useLoadingStore } from "../useStore/useLoading";
import { useCharacterStore } from "../useStore/useCharacterStore";
import { useMailboxStore } from "../useStore/useMailBox";

export const mailboxService = {
  async getMailboxes(characterId: string) {
    try {
      useLoadingStore.getState().setLoading("getMailboxes", true);

      const response = await getMailboxAPI(characterId);

      useMailboxStore.getState().setMailboxes(response);
    } catch (error) {
      console.log("mailboxService.getMailboxes", error);
    } finally {
      useLoadingStore.getState().setLoading("getMailboxes", false);
    }
  },

  async rewardMailbox(characterId: string, mailboxId: string) {
    try {
      useLoadingStore.getState().setLoading("rewardMailbox", true);

      const response = await rewardMailboxAPI(characterId, mailboxId);

      useCharacterStore.getState().updateCharacter(response.character);

      useMailboxStore.getState().updateMailboxes(response.mailbox);

      useMailboxStore.getState().setSelectedMail(response.mailbox);
    } finally {
      useLoadingStore.getState().setLoading("rewardMailbox", false);
    }
  },

  async readMailbox(mailboxId: string) {
    try {
      const mailbox = await readMailboxAPI(mailboxId);

      useMailboxStore.getState().updateMailboxes(mailbox);

      useMailboxStore.getState().setSelectedMail(mailbox);
    } finally {
    }
  },
};
