import ShowWaitinglist from "../components/ShowWaitinglist";
import WaitinglistDequeue from "../components/WaitinglistDequeue";
export default function Oncall() {
  return (
    <div>
      <WaitinglistDequeue />
      <ShowWaitinglist />
    </div>
  );
}
