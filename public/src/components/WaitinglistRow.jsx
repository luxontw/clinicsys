import { createSignal, Switch, Match, batch } from "solid-js";
import { InputGroup, FormControl } from "solid-bootstrap";
import {
  waitinglistStore,
  setWaitinglistStore,
  waitinglistStoreApi,
} from "../stores/waitinglistStore";
import {
  editOneWaitinglistStore, setEditOneWaitinglistStore,
} from "../stores/editOneWaitinglistStore";
import { socket } from "../network/websocket";

export default function WaitinglistRow(props) {
  const item = props.item;
  const [theWaitinglist, setTheWaitinglist] = createSignal(item);

  function cloneTheWaitinglist() {
    return JSON.parse(JSON.stringify(theWaitinglist()));
  }

  function updateTheWaitinglist(key, value) {
    const copyWaitinglist = cloneTheWaitinglist();
    copyWaitinglist[key] = value;
    setTheWaitinglist(copyWaitinglist);
  }

  function isUpdateMode() {
    return (
      editOneWaitinglistStore.mode === "input" &&
      editOneWaitinglistStore.index === props.index()
    );
  }

  return (
    <tr>
      <Switch>
        <Match when={!isUpdateMode() && (item.id != waitinglistStore.waitinglist[0].id)}>
          <td>{item.id}</td>
          <td>{item.member_id}</td>
          <td>{item.name}</td>
          <td>{item.nhi_card_no}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.status}</td>
          <td>
            <button
              className="btn btn-danger mx-2"
              onClick={async (e) => {
                await waitinglistStoreApi.deleteOne(item.id);
                const newWaitinglist = [...waitinglistStore.waitinglist];
                newWaitinglist.splice(props.index(), 1);

                setWaitinglistStore({ waitinglist: newWaitinglist });
                socket.emit("delete-waiting-member", {
                  from: "Waitinglist-delete-check",
                  index: props.index(),
                });
              }}
            >
              <i class="bi bi-trash"></i>
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={(e) => {
                setEditOneWaitinglistStore({
                  mode: "input",
                  index: props.index(),
                });
              }}
            >
              <i class="bi bi-pencil-square"></i>
            </button>
          </td>
        </Match>
        <Match when={isUpdateMode() && (item.id != waitinglistStore.waitinglist[0].id)}>
          <td>{item.id}</td>
          <td>
            <InputGroup>
              <FormControl
                type="text"
                style={{ width: `4ch`, "font-size": "1.1rem" }}
                placeholder="會員編號"
                value={theWaitinglist().member_id}
                onChange={(e) => updateTheWaitinglist("member_id", e.target.value)}
              />
            </InputGroup>
          </td>
          <td>{item.name}</td>
          <td>{item.nhi_card_no}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>{item.status}</td>
          <td>
            <button
              class="btn btn-success mx-2"
              onClick={async (e) => {
                const newWaitinglist = await waitinglistStoreApi.updateOne(
                  cloneTheWaitinglist()
                );
                setEditOneWaitinglistStore("mode", "text");
                if (newWaitinglist.hasOwnProperty("err")) {
                  return;
                }
                batch(() => {
                  setWaitinglistStore(
                    "waitinglist",
                    editOneWaitinglistStore.index,
                    newWaitinglist
                  );

                  socket.emit("update-waitinglist", {
                    from: "Waitinglist-update-check",
                    index: editOneWaitinglistStore.index,
                    data: newWaitinglist,
                  });
                });
              }}
            >
              <i class="bi bi-check-lg"></i>
            </button>
            <button
              class="btn btn-warning mx-2"
              onClick={(e) => {
                setEditOneWaitinglistStore("mode", "text");
              }}
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </td>
        </Match>
      </Switch>
    </tr>
  );
}
