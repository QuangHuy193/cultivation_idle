import { readMailboxAPI, rewardMailboxAPI } from "@/app/axios/mailboxAPI";
import { useLoadingStore } from "../useStore/useLoading";
import { useCharacterStore } from "../useStore/useCharacterStore";
import { useMailboxStore } from "../useStore/useMailBox";

export const mailboxService = {
  async rewardMailbox(characterId: string, mailboxId: string) {
    try {
      useLoadingStore.getState().setActionLoadingName("rewardMailbox");

      const response = await rewardMailboxAPI(characterId, mailboxId);

      useCharacterStore.getState().updateCharacter(response.character);

      useMailboxStore.getState().updateMailboxes(response.mailbox);

      useMailboxStore.getState().setSelectedMail(response.mailbox);
    } finally {
      useLoadingStore.getState().setActionLoadingName("");
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
