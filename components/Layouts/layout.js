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
        <ul>
          <li><Link href="/">Hello World</Link></li>
          <li><Link href="/">Hello World</Link></li>
          <li><Link href="/">Hello World</Link></li>
        </ul>
      </Col>
      <Col>{children}</Col>
    </Row>
  </Container>
);

export default Layout;
