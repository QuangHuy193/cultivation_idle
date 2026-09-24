import { CharacterResponse } from "@/lib/types/characterTypes";
import api from "./axios";
import { Mailbox } from "@/lib/types/mailboxTypes";

export async function getMailboxAPI(userId: string) {
  const res = await api.get(`/api/character/${userId}/mailbox`);
  return res.data.mails;
}

export async function rewardMailboxAPI(
  userId: string,
  mailboxId: string,
): Promise<{ character: CharacterResponse; mailbox: Mailbox }> {
  const res = await api.post(
    `/api/character/${userId}/mailbox/${mailboxId}/reward`,
  );
  return res.data;
}

export async function readMailboxAPI(mailboxId: string): Promise<Mailbox> {
  const res = await api.post(
    `/api/mailbox/${mailboxId}/read`,
  );
  return res.data.mail;
}
