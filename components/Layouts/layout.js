import { Container, Row, Col } from 'react-bootstrap';
import MainNavbar from "../Navs"
import Link from "next/link"

const Layout = ({ children }) => (
  <Container fluid>
    <Row>
      <Col className="p-0">
        <MainNavbar />
      </Col>
    </Row>
    <Row>
      <Col md={2} className="bg-dark">
        <p><Link href="/">Home</Link></p>
        <p><Link href="/create-coaching-request">Create A Coaching Request</Link></p>
      </Col>
      <Col className="p-4">{children}</Col>
    </Row>
  </Container>
);

export default Layout;
