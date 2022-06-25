import { createStore } from "solid-js/store";

let members = [];

const apiURL = "http://localhost:8888/api/members";
const memberStoreApi = {
  getAll: async () => {
    const res = await fetch(apiURL + "/");
    const newMembers = await res.json();
    setMemberStore({ members: newMembers });
    console.log(newMembers);
    return newMembers;
  },
  addOne: async (theMember) => {
    const response = await fetch(apiURL + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(theMember),
    });
    const result = await response.json();
    if (response.status === 200) {
      console.log(`新增成功，新增1成員，id:${result.id}!`);
    } else {
      console.log(`新增失敗:${result.err}！`);
    }
    return result;
  },
  updateOne: async (theMember) => {
    const response = await fetch(apiURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(theMember),
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
const [memberStore, setMemberStore] = createStore({ members: members });

export { memberStore, setMemberStore, memberStoreApi };
