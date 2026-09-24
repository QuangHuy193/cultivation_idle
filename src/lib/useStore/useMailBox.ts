import { create } from "zustand";
import { Mailbox } from "../types/mailboxTypes";
import { getMailPriority } from "../helper";

interface useMailboxState {
  mailboxes: Mailbox[] | [] | null;
  selectedMail: Mailbox | null;

  setMailboxes: (mailboxes: Mailbox[]) => void;
  updateMailboxes: (mail: Mailbox) => void;
  setSelectedMail: (mail: Mailbox | null) => void;
}

export const useMailboxStore = create<useMailboxState>()((set) => ({
  mailboxes: null,
  selectedMail: null,

  setMailboxes: (mailboxes) => {
    set({ mailboxes });
  },

  updateMailboxes: (mail) => {
    set((state) => {
      if (state.mailboxes) {
        const mailboxes = [...state.mailboxes];

        const index = mailboxes.findIndex((m) => m._id === mail._id);

        if (index >= 0) {
          mailboxes[index] = mail;
        } else {
          mailboxes.unshift(mail);
        }

        mailboxes.sort((a, b) => {
          const priorityA = getMailPriority(a);
          const priorityB = getMailPriority(b);

          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }

          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        return { mailboxes };
      }
      return { mailboxes: state.mailboxes };
    });
  },

  setSelectedMail: (mail) => {
    set({ selectedMail: mail });
  },
}));
