import { createStore } from "solid-js/store";

let oncallMember = {
  id: "",
  name: "",
  nhi_card_no: "",
  phone: "",
};
export const [oncallMemberStore, setOncallMemberStore] = createStore({
  oncallMember: oncallMember,
});
