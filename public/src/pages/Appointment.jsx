import ShowMemberTable from "../components/ShowMemberTable";
import MemberEnqueue from "../components/MemberEnqueue";
import MemberDequeue from "../components/MemberDequeue";

export default function Appointment() {
  return (
    <div>
      <MemberDequeue />
      <MemberEnqueue />
      <ShowMemberTable />
    </div>
  );
}