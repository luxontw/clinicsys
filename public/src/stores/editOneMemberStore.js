import { createStore } from "solid-js/store";

export const [editOneMemberStore, setEditOneMemberStore] = createStore({
  mode: "text", // text | input | modal | add
  index: -1,
  info: { id: "", name: "", email: "", status: "" },
});
