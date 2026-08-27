import api from "./axios";

export async function getClassesAPI() {
  const res = await api.get(`/api/classes`);
  return res.data.classes;
}
