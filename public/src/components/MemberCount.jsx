import { Table } from "solid-bootstrap";
import { memberStore, setMemberStore } from "../stores/memberStore";
import {
  oncallMemberStore,
  setOncallMemberStore,
} from "../stores/oncallMemberStore";

export default function MemberCount() {
  return (
    <div>
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
              <p>{memberStore.members.length}</p>
            </td>
            <td>
              <p>{oncallMemberStore.oncallMember.id}</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
