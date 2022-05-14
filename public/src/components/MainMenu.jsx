import logo from "../logo.png";
import { Navbar, Nav, Container } from "solid-bootstrap";

export default function MainMenu() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img alt="" src={logo} width="30" height="30" />
          {/* Bootstrap mx-2 */}
          <span class="mx-2">Dev</span>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/features">特色</Nav.Link>
          <Nav.Link href="/about">關於我們</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
