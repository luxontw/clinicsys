import ShowWaitinglist from "../components/ShowWaitinglist";
import WaitinglistEnqueue from "../components/WaitinglistEnqueue";

export default function Appointment() {
  return (
    <div>
      <WaitinglistEnqueue />
      <ShowWaitinglist />
    </div>
  );
}
