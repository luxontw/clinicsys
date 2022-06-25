import { createSignal, batch } from "solid-js";
import { Table } from "solid-bootstrap";
import { InputGroup, FormControl } from "solid-bootstrap";
import { memberStore, setMemberStore, memberStoreApi } from "../stores/memberStore";
import { socket } from "../network/websocket";

export default function MemberEnqueue(props) {
  const newMember = {
    id: "",
    name: "",
    nhi_card_no: "",
    phone: "",
    email: "",
    status: "0",
  };
  const [theMember, setTheMember] = createSignal(newMember);
  function cloneTheMember() {
    return JSON.parse(JSON.stringify(theMember()));
  }
  function updateNewMember(key, value) {
    const copyMember = cloneTheMember();
    copyMember[key] = value;
    setTheMember(copyMember);
  }
  return (
    <Table striped bordered hover variant="dark">
      <tbody>
        <tr>
          <td style={{ width: `13ch`, "font-size": "1.5rem" }}>
            請輸入患者資訊
          </td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `13ch`, "font-size": "1.1rem" }}
                placeholder="姓名"
                onChange={(e) => updateNewMember("name", e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `13ch`, "font-size": "1.1rem" }}
                placeholder="健保卡號"
                onChange={(e) => updateNewMember("nhi_card_no", e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `13ch`, "font-size": "1.1rem" }}
                placeholder="手機號碼"
                onChange={(e) => updateNewMember("phone", e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `13ch`, "font-size": "1.1rem" }}
                placeholder="電子郵件"
                onChange={(e) => updateNewMember("email", e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <button
              class="btn btn-success mx-2"
              onClick={async (e) => {
                const newMember = await memberStoreApi.addOne(cloneTheMember());
                if (newMember.hasOwnProperty("err")) {
                  return;
                }
                batch(() => {
                  const newMembers = [...memberStore.members];
                  theMember().id = newMembers[newMembers.length - 1].id + 1;
                  newMembers.push(cloneTheMember());
                  setMemberStore({ members: newMembers });
                  socket.emit("create-member", {
                    from: "MemberEnqueue-create-member-check",
                    data: cloneTheMember(),
                  });
                });
              }}
            >
              <value>掛號</value>
            </button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
