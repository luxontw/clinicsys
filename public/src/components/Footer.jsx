import logo from "../logo.png";
import { Container } from "solid-bootstrap";

export default function Footer(props) {
  return (
    <footer class="footer mt-auto py-3 bg-dark">
      <div class="container">
        <a
          href="/"
          class="mb-3 me-2 mb-md-0 text-muted"
        >
          <img alt="" src={logo} width="24" height="24" />
        </a>
        <span class="mb-3 mb-md-0 text-muted">
          © Clinicsys 門診系統&nbsp&nbsp&nbsp日資工二甲 U0933030 盧易賢
        </span>
      </div>
    </footer>
  );
}
