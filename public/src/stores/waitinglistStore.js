import { createStore } from "solid-js/store";

let waitinglist = [];

const apiURL = "http://localhost:8888/api/waitinglist";
const waitinglistStoreApi = {
  getAll: async () => {
    const res = await fetch(apiURL + "/");
    const newWaitinglist = await res.json();
    setWaitinglistStore({ waitinglist: newWaitinglist });
    console.log(newWaitinglist);
    return newWaitinglist;
  },
  addOne: async (theWaitinglist) => {
    const response = await fetch(apiURL + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(theWaitinglist),
    });
    const result = await response.json();
    if (response.status === 200) {
      console.log(`新增成功，新增1成員，id:${result.id}!`);
    } else {
      alert(`新增失敗:${result.err}`);
    }
    return result;
  },
  updateOne: async (theWaitinglist) => {
    const response = await fetch(apiURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(theWaitinglist),
    });
    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
      console.log(`更新成功!`);
    } else {
      console.log(`更新失敗！`);
    }
    return result;
  },
  deleteOne: async (id) => {
    const response = await fetch(apiURL + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: id }),
    });
    const result = await response.json();

    if (response.status === 200) {
      console.log(`刪除成功,成員id：${id}!`);
    } else {
      console.log(`刪除失敗,成員id：${id}!`);
    }
    return id;
  },
};
const [waitinglistStore, setWaitinglistStore] = createStore({
  waitinglist: waitinglist,
});

export { waitinglistStore, setWaitinglistStore, waitinglistStoreApi };
