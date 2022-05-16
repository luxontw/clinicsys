import { createSignal, Switch, Match, batch } from "solid-js";
import { InputGroup, FormControl } from "solid-bootstrap";
import { memberStore, setMemberStore } from "../stores/memberStore";
import { socket } from "../network/websocket";
import {
  editOneMemberStore,
  setEditOneMemberStore,
} from "../stores/editOneMemberStore";

export default function MemberTableRow(props) {
  const item = props.item;
  const [theMember, setTheMember] = createSignal(item);

  function cloneTheMember() {
    return JSON.parse(JSON.stringify(theMember()));
  }

  function updateTheMember(key, value) {
    const copyMember = cloneTheMember();
    copyMember[key] = value;
    setTheMember(copyMember);
  }

  function isUpdateMode() {
    return (
      (editOneMemberStore.mode === "input" ||
        editOneMemberStore.mode === "add") &&
      editOneMemberStore.index === props.index()
    );
  }

  return (
    <tr>
      <Switch fallback={<div>editOneMemberStore.mode</div>}>
        <Match when={!isUpdateMode()}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.nhi_card_no}</td>
          <td>{item.phone}</td>
          <td>
            <button
              className="btn btn-info mx-2"
              onClick={(e) => {
                const newMembers = [...memberStore.members];
                newMembers.splice(props.index(), 0, cloneTheMember());
                setMemberStore({ members: newMembers });
                setEditOneMemberStore({
                  mode: "add",
                  index: props.index(),
                });
              }}
            >
              <i class="bi bi-clipboard"></i>
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
                const newMembers = [...memberStore.members];
                newMembers.splice(props.index(), 1);

                setMemberStore({ members: newMembers });
                socket.emit("delete-member", {
                  from: "TableMemberRow-delete-trash",
                  data: props.index(),
                });
              }}
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </Match>
        <Match when={isUpdateMode()}>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `4ch`, "font-size": "1.1rem" }}
                placeholder="候診號碼"
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
                placeholder="姓名"
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
                placeholder="健保卡號"
                value={theMember().nhi_card_no}
                onChange={(e) => updateTheMember("nhi_card_no", e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `4ch`, "font-size": "1.1rem" }}
                placeholder="手機號碼"
                value={theMember().phone}
                onChange={(e) => updateTheMember("phone", e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
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
          </td>
        </Match>
      </Switch>
    </tr>
  );
}
