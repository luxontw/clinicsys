import { createSignal, batch } from "solid-js";
import { Table } from "solid-bootstrap";
import {
  waitinglistStore,
  setWaitinglistStore,
  waitinglistStoreApi,
} from "../stores/waitinglistStore";
import { socket } from "../network/websocket";

export default function WaitinglistDequeue(props) {
  return (
    <Table striped bordered hover variant="dark">
      <tbody>
        <tr>
          <td>看診中患者</td>
          <Show
            when={waitinglistStore.waitinglist[0]}
            fallback={<td>尚未開始看診</td>}
          >
            <td>{waitinglistStore.waitinglist[0].name}</td>
            <td>{waitinglistStore.waitinglist[0].nhi_card_no}</td>
            <td>{waitinglistStore.waitinglist[0].phone}</td>
            <td>{waitinglistStore.waitinglist[0].email}</td>
          </Show>
          <td>
            <button
              class="btn btn-success mx-2"
              onClick={async (e) => {
                const waitinglist = await waitinglistStoreApi.deleteOne(waitinglistStore.waitinglist[0].id);
                if (waitinglist.hasOwnProperty("err")) {
                  return;
                }
                batch(() => {
                  const newWaitinglist = [...waitinglistStore.waitinglist];
                  newWaitinglist.shift();
                  setWaitinglistStore({ waitinglist: newWaitinglist });
                  socket.emit("delete-waiting-member", {
                    from: "WaitinglistDequeue-delete-waiting-member-check",
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
