import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../image/logo.png";
import user from "../image/user.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Swal from "sweetalert2";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("is_authenticated");
        window.location.href = "/";
        Swal.fire("Logged out!", "", "success");
      }
    });
  };

  return (
    <>
      <Navbar
        className="bg-body-tertiary"
        style={{ backgroundColor: "aliceblue" }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="80"
              height="70"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar expand="lg">
              <Navbar.Brand href="#home">
                <img
                  src={user}
                  className="d-inline-block align-top avatar"
                  alt="User Avatar"
                  onClick={handleDropdownToggle}
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <NavDropdown
                    id="basic-nav-dropdown"
                    show={dropdownOpen}
                    onClick={handleDropdownToggle}
                  >
                    <NavDropdown.Item href="#action/1">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/2">Update</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
