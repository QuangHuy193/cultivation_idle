import api from "./axios";

export async function getMailboxAPI(userId: string) {
  const res = await api.get(`/api/character/${userId}/mailbox`);
  return res.data.mails;
}
