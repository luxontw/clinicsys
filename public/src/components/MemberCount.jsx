import { Show } from "solid-js";
import { Table } from "solid-bootstrap";
import { memberStore, setMemberStore } from "../stores/memberStore";
import {
  oncallMemberStore,
  setOncallMemberStore,
} from "../stores/oncallMemberStore";

export default function MemberCount() {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>等待人數</th>
          <th>目前號碼</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {memberStore.members.length}
          </td>
          <td>
          <Show
            when={oncallMemberStore.oncallMember.id !== ""}
            fallback={<>尚未開始看診</>}
          >
            {oncallMemberStore.oncallMember.id}
          </Show>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
