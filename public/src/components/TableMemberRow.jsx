import { createSignal, Switch, Match, batch } from "solid-js";
import { InputGroup, FormControl } from "solid-bootstrap";
import { memberStore, setMemberStore } from "../stores/memberStore";

import { socket } from "../network/websocket";

import {
  editOneMemberStore,
  setEditOneMemberStore,
} from "../stores/editOneMemberStore";

export default function TableMemberRow(props) {
  const item = props.item;
  const [theMember, setTheMember] = createSignal(item);

  // 打斷 reactivity
  function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function cloneTheMember() {
    return cloneObject(theMember());
  }

  function updateTheMember(pKey, pVal) {
    const aMember = cloneTheMember();
    aMember[pKey] = pVal;
    setTheMember(aMember);
  }

  function isUpdateMode() {
    return (
      (editOneMemberStore.mode === "input" ||
        editOneMemberStore.mode === "add") &&
      editOneMemberStore.index === props.index()
    );
  }
  return (
    <>
      <tr>
        <Switch fallback={<div>editOneMemberStore.mode</div>}>
          <Match when={!isUpdateMode()}>
            <td>{props.index() + 1}</td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
              <Switch fallback={<div>Mode Not Found</div>}>
                <Match when={item.status === "active"}>
                  <i class="bi bi-lightbulb" style="color:yellow;"></i>
                </Match>
                <Match when={item.status === "in-active"}>
                  <i class="bi bi-lightbulb-off" style="color:gray;"></i>
                </Match>
              </Switch>
            </td>
          </Match>
          <Match when={isUpdateMode()}>
            <td>{props.index() + 1}</td>
            <td>
              <InputGroup>
                <FormControl
                  type="text"
                  style={{ width: `4ch`, "font-size": "1.1rem" }}
                  placeholder="Id"
                  value={theMember().id}
                  onChange={(e) => updateTheMember("id", e.target.value)}
                />
              </InputGroup>
            </td>
            <td>
              <InputGroup>
                <FormControl
                  type="text"
                  style={{ width: `4ch`, "font-size": "1.1rem" }}
                  placeholder="Name"
                  value={theMember().name}
                  onChange={(e) => updateTheMember("name", e.target.value)}
                />
              </InputGroup>
            </td>
            <td>
              <InputGroup>
                <FormControl
                  type="text"
                  style={{ width: `4ch`, "font-size": "1.1rem" }}
                  placeholder="Email"
                  value={theMember().email}
                  onChange={(e) => updateTheMember("email", e.target.value)}
                />
              </InputGroup>
            </td>
            <td>
              <InputGroup>
                <FormControl
                  type="text"
                  style={{ width: `4ch`, "font-size": "1.1rem" }}
                  placeholder="Status"
                  value={theMember().status}
                  onChange={(e) => updateTheMember("status", e.target.value)}
                />
              </InputGroup>
            </td>
          </Match>
        </Switch>
        <td>
          <Switch fallback={<div>Mode Not Found</div>}>
            <Match when={!isUpdateMode()}>
              <button className="btn btn-primary mx-2">
                <i class="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-info mx-2"
                onClick={(e) => {
                  // 打斷 reactivity
                  const newMembers = [...memberStore.members];
                  newMembers.splice(props.index(), 0, cloneTheMember());
                  //
                  setMemberStore({ members: newMembers });

                  setEditOneMemberStore({
                    mode: "add",
                    index: props.index(),
                  });
                }}
              >
                <i class="bi bi-plus-square"></i>
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={(e) => {
                  setEditOneMemberStore({
                    mode: "input",
                    index: props.index(),
                  });
                }}
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={(e) => {
                  // 打斷 reactivity
                  const newMembers = [...memberStore.members];
                  newMembers.splice(props.index(), 1);
                  
                  setMemberStore({ members: newMembers });

                  // socket.emit("delete-member", {
                  //   from: "TableMemberRow-delete-trash",
                  //   data: item,
                  // });
                  socket.emit("delete-member", {
                    from: "TableMemberRow-delete-trash",
                    data: props.index(),
                  });
                }}
              >
                <i class="bi bi-trash"></i>
              </button>
            </Match>
            <Match when={isUpdateMode()}>
              <button
                class="btn btn-primary mx-2"
                onClick={(e) => {
                  batch(() => {
                    setEditOneMemberStore("mode", "text");

                    setMemberStore(
                      "members",
                      editOneMemberStore.index,
                      cloneTheMember()
                    );

                    socket.emit("update-member", {
                      from: "TableMemberRow-update-check",
                      data: cloneTheMember(),
                    });
                  });
                }}
              >
                <i class="bi bi-check-lg"></i>
              </button>
              <button
                class="btn btn-primary mx-2"
                onClick={(e) => {
                  setEditOneMemberStore("mode", "text");
                }}
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </Match>
          </Switch>
        </td>
      </tr>
    </>
  );
}
