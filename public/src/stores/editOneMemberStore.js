import { createStore } from "solid-js/store";

export const [editOneMemberStore, setEditOneMemberStore] = createStore({
  mode: "text",
  index: -1,
  info: { id: "", name: "", nhi_card_no: "", phone: "" },
});
