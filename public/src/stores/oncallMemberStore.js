import { createStore } from "solid-js/store";

let oncallMember = {
  id: "Null",
  name: "Null",
  nhi_card_no: "Null",
  phone: "Null",
};
export const [oncallMemberStore, setOncallMemberStore] = createStore({
  oncallMember: oncallMember,
});
