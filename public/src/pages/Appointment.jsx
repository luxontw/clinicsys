import ShowMemberTable from "../components/ShowMemberTable";
import MemberEnqueue from "../components/MemberEnqueue";
import MemberDequeue from "../components/MemberDequeue";

export default function Appointment() {
  return (
    <div>
      <MemberEnqueue />
      <ShowMemberTable />
    </div>
  );
}
