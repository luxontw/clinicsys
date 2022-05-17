import { batch } from "solid-js";
import { Table } from "solid-bootstrap";
import { InputGroup, FormControl } from "solid-bootstrap";
import { memberStore, setMemberStore } from "../stores/memberStore";
import {
  editOneMemberStore,
  setEditOneMemberStore,
} from "../stores/editOneMemberStore";
import { socket } from "../network/websocket";

export default function MemberEnqueue(props) {
  var newMember = {
    id: "",
    name: "",
    nhi_card_no: "",
    phone: "",
  };
  return (
    <Table striped bordered hover variant="dark">
      <tbody>
        <tr>
          <td>
            <p>掛號</p>
          </td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `4ch`, "font-size": "1.1rem" }}
                placeholder="姓名"
                onChange={(e) => (newMember["name"] = e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `4ch`, "font-size": "1.1rem" }}
                placeholder="健保卡號"
                onChange={(e) => (newMember["nhi_card_no"] = e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `4ch`, "font-size": "1.1rem" }}
                placeholder="手機號碼"
                onChange={(e) => (newMember["phone"] = e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <button
              class="btn btn-success mx-2"
              onClick={(e) => {
                batch(() => {
                  const newMembers = [...memberStore.members];
                  const len = newMembers.length;
                  newMember["id"] = len + 1;
                  console.log(newMember);
                  newMembers.push(newMember);
                  setMemberStore({ members: newMembers });
                  socket.emit("create-member", {
                    from: "MemberEnqueue-create-check",
                    data: newMember,
                  });
                });
              }}
            >
              <i class="bi bi-check-lg"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
