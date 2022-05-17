import { createSignal, batch } from "solid-js";
import { Table } from "solid-bootstrap";
import { memberStore, setMemberStore } from "../stores/memberStore";
import {
  oncallMemberStore,
  setOncallMemberStore,
} from "../stores/oncallMemberStore";
import { socket } from "../network/websocket";

export default function MemberDequeue(props) {
  function cloneTheMember(oncallMember) {
    return JSON.parse(JSON.stringify(oncallMember));
  }
  function updateOncallMember(oncallMember) {
    const copyMember = cloneTheMember(oncallMember);
    setOncallMemberStore({ oncallMember: copyMember });
    return copyMember;
  }
  return (
    <Table striped bordered hover variant="dark">
      <tbody>
        <tr>
          <td>
            <p>看診中患者</p>
          </td>
          <td>
            <p>{oncallMemberStore.oncallMember.id}</p>
          </td>
          <td>
            <p>{oncallMemberStore.oncallMember.name}</p>
          </td>
          <td>
            <p>{oncallMemberStore.oncallMember.nhi_card_no}</p>
          </td>
          <td>
            <p>{oncallMemberStore.oncallMember.phone}</p>
          </td>
          <td>
            <button
              class="btn btn-success mx-2"
              onClick={(e) => {
                batch(() => {
                  const newMembers = [...memberStore.members];
                  const oncallMember = updateOncallMember(newMembers.shift());
                  setMemberStore({ members: newMembers });
                  socket.emit("update-oncallMember", {
                    from: "MemberDequeue-update-oncallMember-check",
                    data: oncallMember,
                  });
                  socket.emit("delete-member", {
                    from: "MemberDequeue-delete-member-check",
                    index: 0,
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
