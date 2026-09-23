import { create } from "zustand";
import { Mailbox } from "../types/mailboxTypes";

interface useMailboxState {
  mailboxes: Mailbox[] | [];
  selectedMail: Mailbox | null;

  setMailboxes: (mailboxes: Mailbox[]) => void;
  updateMailboxes: (mail: Mailbox) => void;
  setSelectedMail: (mail: Mailbox | null) => void;
}

export const useMailboxStore = create<useMailboxState>()((set) => ({
  mailboxes: [],
  selectedMail: null,

  setMailboxes: (mailboxes) => {
    set({ mailboxes });
  },

  updateMailboxes: (mail) => {
    set((state) => {
      const exists = state.mailboxes.some((m) => m._id === mail._id);

      if (exists) {
        return {
          mailboxes: state.mailboxes.map((m) =>
            m._id === mail._id ? mail : m,
          ),
        };
      }

      return {
        mailboxes: [mail, ...state.mailboxes],
      };
    });
  },

  setSelectedMail: (mail) => {
    set({ selectedMail: mail });
  },
}));
