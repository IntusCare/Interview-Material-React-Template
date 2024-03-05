import { Container, Navbar } from "react-bootstrap";
import "./index.scss";

function IntusCareNavbar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="intus-navbar">
        <Container className="ms-2">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/intus-care-assets/logo_IntusCare.svg"
              className="d-inline-block align-top"
              height={56}
            />{" "}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default IntusCareNavbar;
