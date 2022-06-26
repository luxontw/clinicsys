import { Show } from "solid-js";
import { Table } from "solid-bootstrap";
import {
  waitinglistStore,
  setWaitinglistStore,
  waitinglistStoreApi,
} from "../stores/waitinglistStore";

export default function WaitinglistCount() {
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
            {waitinglistStore.waitinglist.length - 1}
          </td>
          <td>
          <Show
            when={waitinglistStore.waitinglist[0]}
            fallback={<>尚未開始看診</>}
          >
            {waitinglistStore.waitinglist[0].id}
          </Show>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
