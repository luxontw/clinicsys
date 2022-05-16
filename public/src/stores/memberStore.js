import { createStore } from "solid-js/store";

let members = [
  { id: 1, name: "林丞祥", nhi_card_no: "000045458181", phone: "0912612010"},
  { id: 2, name: "杜彥君", nhi_card_no: "000014178651", phone: "0972414871"},
  { id: 3, name: "賴怡璇", nhi_card_no: "000031241120", phone: "0911215103"},
  { id: 4, name: "蔡文筠", nhi_card_no: "000051243364", phone: "0932641571"},
  { id: 5, name: "陳韻如", nhi_card_no: "000071471220", phone: "0933414521"},
];
export const [memberStore, setMemberStore] = createStore({ members: members });