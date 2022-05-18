import { createSignal, batch, Show } from "solid-js";
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
            看診中患者
          </td>
          <Show
            when={oncallMemberStore.oncallMember.id !== ""}
            fallback={<td>尚未開始看診</td>}
          >
            <td>
              {oncallMemberStore.oncallMember.id}
            </td>
            <td>
              {oncallMemberStore.oncallMember.name}
            </td>
            <td>
              {oncallMemberStore.oncallMember.nhi_card_no}
            </td>
            <td>
              {oncallMemberStore.oncallMember.phone}
            </td>
          </Show>
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
              <value>下一位</value>
            </button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
