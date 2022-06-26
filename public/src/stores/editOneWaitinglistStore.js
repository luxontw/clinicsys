import { createStore } from "solid-js/store";

export const [editOneWaitinglistStore, setEditOneWaitinglistStore] =
  createStore({
    mode: "text",
    index: -1,
    info: {
      id: "",
      member_id: "",
      name: "",
      nhi_card_no: "",
      phone: "",
      email: "",
      status: "",
    },
  });
