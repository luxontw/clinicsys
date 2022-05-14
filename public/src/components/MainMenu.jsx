import logo from "../logo.png";
import { Navbar, Nav, Container } from "solid-bootstrap";

export default function MainMenu() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img alt="" src={logo} width="30" height="30" />
          <span class="mx-2">門診掛號系統</span>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">等待中</Nav.Link>
          <Nav.Link href="/appointment">掛號</Nav.Link>
          <Nav.Link href="/oncall">看診</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
