import { memberStore, setMemberStore } from "../stores/memberStore";
import { Table } from "solid-bootstrap";
import { For } from "solid-js";
import MemberTableRow from "./MemberTableRow";

export default function ShowMemberTable(props) {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>候診號碼</th>
            <th>姓名</th>
            <th>健保卡號</th>
            <th>手機號碼</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <For each={memberStore.members} fallback={<div>Loading...</div>}>
            {(item, index) => {
              return <MemberTableRow item={item} index={index} />;
            }}
          </For>
        </tbody>
      </Table>
    </>
  );
}
