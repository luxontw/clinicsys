import { Table } from "solid-bootstrap";
import { For } from "solid-js";
import { waitinglistStore, setWaitinglistStore } from "../stores/waitinglistStore";
import WaitinglistRow from "./WaitinglistRow";

export default function ShowWaitinglist(props) {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>候診號碼</th>
            <th>會員編號</th>
            <th>姓名</th>
            <th>健保卡號</th>
            <th>手機號碼</th>
            <th>電子郵件</th>
            <th>身份別</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <For each={waitinglistStore.waitinglist} fallback={<div>今日看診已結束</div>}>
            {(item, index) => {
              return <WaitinglistRow item={item} index={index} />;
            }}
          </For>
        </tbody>
      </Table>
    </>
  );
}
