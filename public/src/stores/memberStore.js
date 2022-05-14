import { createStore } from "solid-js/store";

let members = [
  { id: 1, name: "11111", email: "1@1", status: "active" },
  { id: 2, name: "22222", email: "2@2", status: "in-active" },
  { id: 3, name: "33333", email: "3@3", status: "active" },
  { id: 4, name: "44444", email: "4@4", status: "in-active" },
  { id: 5, name: "55555", email: "5@5", status: "active" },
];
export const [memberStore, setMemberStore] = createStore({ members: members });