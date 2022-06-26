import { createSignal, batch } from "solid-js";
import { Table } from "solid-bootstrap";
import { InputGroup, FormControl } from "solid-bootstrap";
import {
  waitinglistStore,
  setWaitinglistStore,
  waitinglistStoreApi,
} from "../stores/waitinglistStore";
import { socket } from "../network/websocket";

export default function WaitinglistEnqueue(props) {
  const newWaitinglist = {
    id: "",
    member_id: "",
    name: "",
    nhi_card_no: "",
    phone: "",
    email: "",
    status: "",
  };
  const [theWaitinglist, setTheWaitinglist] = createSignal(newWaitinglist);
  function cloneWaitinglist() {
    return JSON.parse(JSON.stringify(theWaitinglist()));
  }
  function updateWaitinglist(key, value) {
    const copyWaitinglist = cloneWaitinglist();
    copyWaitinglist[key] = value;
    setTheWaitinglist(copyWaitinglist);
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
                placeholder="健保卡號"
                onChange={(e) => updateWaitinglist("nhi_card_no", e.target.value)}
              />
            </InputGroup>
          </td>
          <td>
            <button
              class="btn btn-success mx-2"
              onClick={async (e) => {
                const waitinglist = await waitinglistStoreApi.addOne(cloneWaitinglist());
                
                if (waitinglist.hasOwnProperty("err")) {
                  return;
                }
                batch(() => {
                  const newWaitinglist = [...waitinglistStore.waitinglist];
                  theWaitinglist().id = waitinglist.id;
                  theWaitinglist().member_id = waitinglist.member_id;
                  theWaitinglist().name = waitinglist.name;
                  theWaitinglist().phone = waitinglist.phone;
                  theWaitinglist().email = waitinglist.email;
                  theWaitinglist().status = waitinglist.status;
                  newWaitinglist.push(cloneWaitinglist());
                  setWaitinglistStore({ waitinglist: newWaitinglist });
                  socket.emit("create-waiting-member", {
                    from: "WaitinglistEnqueue-create-waiting-member-check",
                    data: cloneWaitinglist(),
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
