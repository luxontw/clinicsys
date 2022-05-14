import { memberStore, setMemberStore } from "../stores/memberStore";
import { Table } from "solid-bootstrap";
import { For } from "solid-js";
import TableMemberRow from "./TableMemberRow";

export default function ShowMembersTable(props) {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
            <th>Log</th>
          </tr>
        </thead>
        <tbody>
          <For each={memberStore.members} fallback={<div>Loading...</div>}>
            {(item, index) => {
              return <TableMemberRow item={item} index={index} />;
            }}
          </For>
        </tbody>
      </Table>
    </>
  );
}
