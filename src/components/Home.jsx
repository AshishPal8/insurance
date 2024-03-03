import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_LINKS2,
} from "../lib/consts/Navigation";
const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeNavIndex1, setActiveNavIndex1] = useState(0);
  const [activeNavIndex2, setActiveNavIndex2] = useState(0);
  const clickHandler1 = (index) => {
    setActiveTab(0);
    setActiveNavIndex1(index);
  };
  const clickHandler2 = (index) => {
    setActiveTab(1);
    setActiveNavIndex2(index);
  };
  return (
    <>
      <div>
        <Row>
          <Col sm={2}>
            <Card
              style={{
                width: "14rem",
                height: "100vh",
                backgroundColor: "#f0f0f0",
              }}
            >
              <Card.Body>
                {/* <Card.Title>         <Card.Img variant="top" src={homeside} /> </Card.Title> */}
                <Card.Text>
                  <ListGroup as="ul">
                    <ListGroup.Item as="li">Dashboard</ListGroup.Item>
                    <ListGroup.Item as="li">
                      {" "}
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Masters</Accordion.Header>
                          <Accordion.Body>
                            {DASHBOARD_SIDEBAR_LINKS.map((item, index) => (
                              <Nav
                                onClick={() => clickHandler1(index)}
                                className="flex-column p-2 text-bg-light cursor-pointer"
                              >
                                <Nav
                                  onClick={() => setActiveNavIndex1(index)}
                                  key={index}
                                  className={
                                    activeNavIndex1 === index
                                      ? "current"
                                      : "default"
                                  }
                                >
                                  {item?.label}
                                </Nav>
                              </Nav>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>Input Form</Accordion.Header>
                          <Accordion.Body>
                            {DASHBOARD_SIDEBAR_LINKS2.map((item, index) => (
                              <Nav
                                onClick={() => clickHandler2(index)}
                                className="flex-column p-2 text-bg-light cursor-pointer"
                                key={index}
                              >
                                <Nav
                                  onClick={() => setActiveNavIndex2(index)}
                                  key={index}
                                  className={
                                    activeNavIndex2 === index
                                      ? "current2"
                                      : "default2"
                                  }
                                >
                                  {item?.label}
                                </Nav>
                              </Nav>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={10}>
            {activeTab === 0 &&
              DASHBOARD_SIDEBAR_LINKS[activeNavIndex1].content}
            {activeTab === 1 &&
              DASHBOARD_SIDEBAR_LINKS2[activeNavIndex2].content}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
