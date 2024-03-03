import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { GiSightDisabled } from "react-icons/gi";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  const [toggle, setToogle] = useState(true);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [show, setShow] = useState(false);
  const [enabledRows, setEnabledRows] = useState([]);

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    repassword: "",
    phone: "",
    role: "",
    branch: "",
    createdAt: "",
    updatedAt: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/user/all") // Endpoint to fetch all users
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const toggleButton = () => {
    setToogle(!toggle);
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      repassword: "",
      phone: "",
      role: "",
      branch: "",
    });
  };
  const handleShow = () => {
    setShow(true);
    setFormData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      repassword: "",
      phone: "",
      role: "",
      branch: "",
    });
  };

  const handleSave = async () => {
    if (formData.password !== formData.repassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formDataWithRoleAndBranch = {
      ...formData,
      roleDTO: {
        roleName: formData.role,
      },
      branchDTO: {
        branchName: formData.branch,
      },
    };

    try {
      const response = await axios.post(
        `/user/save`,
        formDataWithRoleAndBranch
      );
      const newUser = response.data;
      console.log("User added successfully:", newUser);
      setUsers([...users, newUser]);
      toast.success("User added successfully");
      setShow(false);
      // Reset the formData state
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        repassword: "", // Reset repassword field
        phone: "",
        role: "",
        branch: "",
      });

      setIsUpdate(false); // Reset isUpdate state
      setEditMode(false); // Reset editMode state
      setIsReadOnly(false);
      // Reset the form
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle view
  const handleView = (user) => {
    handleShow();
    setShow(true);
    setFormData(user);
    setEditMode(false);
    setIsReadOnly(true);
    console.log("Password:", user.password);
  };

  //for Edit and update

  const handelEdit = (user) => {
    handleShow();
    setShow(true);
    setFormData({
      ...user,
      id: user.id,
    });
    setEditMode(true);
    setSelectedUser(user);
    setIsReadOnly(false);
  };

  const handelUpdate = () => {
    axios
      .put(`/user/update`, {
        id: formData.id,
        firstname: formData.firstname,
        lastname: formData.lastname,
        roleDTO: {
          id: formData.roleDTO.id,
          roleName: formData.roleDTO.roleName,
        },
        branchDTO: {
          id: formData.branchDTO.id,
          branchName: formData.branchDTO.branchName,
        },
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
        repassword: formData.repassword,
      })
      .then((response) => {
        const updatedUser = response.data;
        console.log(updatedUser);
        const updatedUsers = users.map((user) =>
          user.id === formData.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        toast.success("User updated successfully");
        setShow(false);
        setSelectedUser(null); // Reset selectedUser state
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Failed to update user");
      });
  };

  //for delete user
  const handelDelete = (id) => {
    if (window.confirm("Are you sure to delete this item?")) {
      axios
        .delete(`/user/delete/${id}`)
        .then((response) => {
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user");
        });
    }
  };

  const toggleUserActions = (id) => {
    if (enabledRows.includes(id)) {
      setEnabledRows(enabledRows.filter((rowId) => rowId !== id));
    } else {
      setEnabledRows([...enabledRows, id]);
    }
  };

  return (
    <div>
      <div className="crud shadow-lg p-2 mb-5 mt-3 border rounded container">
        <div className="row">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search User"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>User Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred pl">
            <Button variant="primary" onClick={handleShow}>
              Add New User
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>Sl.</th>
                  <th>First Name</th>
                  <th>Last Name </th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Branch</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Enabled/Disabled</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.username}</td>
                        <td>{item.phone}</td>
                        <td>{item.roleDTO && item.roleDTO.roleName}</td>
                        <td>{item.branchDTO && item.branchDTO.branchName}</td>
                        <td>
                          {new Date(item.createdAt).toLocaleDateString("en-US")}
                        </td>
                        <td>
                          {new Date(item.updatedAt).toLocaleDateString("en-US")}
                        </td>
                        <td>
                          <Button
                            variant={
                              enabledRows.includes(item.id)
                                ? "danger"
                                : "success"
                            }
                            onClick={() => toggleUserActions(item.id)}
                          >
                            {enabledRows.includes(item.id)
                              ? "Disabled"
                              : "Enabled"}
                          </Button>
                        </td>
                        <td>
                          {!enabledRows.includes(item.id) ? (
                            <>
                              <Link
                                to="#"
                                className="view"
                                title="View"
                                data-toggle="tooltip"
                                style={{ color: "#10ab80" }}
                                onClick={() => handleView(item)}
                              >
                                <i className="material-icons">&#xE417;</i>
                              </Link>
                              <Link
                                to="#"
                                className="edit"
                                title="Edit"
                                data-toggle="tooltip"
                                onClick={() => handelEdit(item)}
                              >
                                <i className="material-icons">&#xE254;</i>
                              </Link>
                              <Link
                                to="#"
                                className="delete"
                                title="Delete"
                                data-toggle="tooltip"
                                style={{ color: "red" }}
                                onClick={() => handelDelete(item.id)}
                              >
                                <i className="material-icons">&#xE872;</i>
                              </Link>
                            </>
                          ) : (
                            <GiSightDisabled
                              style={{ color: "gray" }}
                              size={30}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className="modal-lg"
          >
            <Modal.Header closeButton>
              {/* Dynamically changing the modal title */}
              {isUpdate ? (
                <Modal.Title>Edit User</Modal.Title>
              ) : (
                <>
                  {editMode ? (
                    <Modal.Title>Edit User</Modal.Title>
                  ) : (
                    <Modal.Title>
                      {isReadOnly ? "User Details" : "Create User"}
                    </Modal.Title>
                  )}
                </>
              )}
            </Modal.Header>

            <Modal.Body>
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div className="row">
                  <div className="col">
                    <label htmlFor="firstName" className="form-label">
                      First Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Enter First Name"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.firstname}
                      readOnly={isReadOnly}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="lastName" className="form-label">
                      Last Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Enter Last Name"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.lastname}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="role" className="form-label">
                      Role<sup>*</sup>
                    </label>
                    <select
                      className="form-select"
                      name="role"
                      id="role"
                      aria-label="Default select example"
                      onChange={handleInputChange}
                      value={formData.roleName}
                      disabled={isReadOnly}
                    >
                      <option disabled={!isReadOnly} selected={!isReadOnly}>
                        {" "}
                        Select Role
                      </option>
                      <option value="Administration">Administration</option>
                      <option value="Sales">Sales</option>
                      <option value="SuperAdmin">SuperAdmin</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="branch" className="form-label">
                      Branch<sup>*</sup>
                    </label>
                    <select
                      className="form-select"
                      name="branch"
                      id="branch"
                      aria-label="Default select example"
                      onChange={handleInputChange}
                      value={formData.branchName}
                      disabled={isReadOnly}
                    >
                      <option disabled={!isReadOnly} selected={!isReadOnly}>
                        {" "}
                        Select Branch
                      </option>
                      <option value="Noida">Noida</option>
                      <option value="Vaishali">Vaishali</option>
                      <option value="Vashundhra">Vashundhra</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="phone" className="form-label">
                      Phone<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="9134567899"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.phone}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="userName" className="form-label">
                      Username<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      name="username"
                      id="username"
                      placeholder="Enter Username"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.username}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="password" className="form-label">
                      Password<sup>*</sup>
                    </label>
                    <input
                      type={!isReadOnly ? "password" : "text"}
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.password}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="repassword" className="form-label">
                      Confirm Password<sup>*</sup>
                    </label>
                    <input
                      type={!isReadOnly ? "password" : "text"}
                      name="repassword"
                      id="repassword"
                      placeholder="Confirm Password"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.repassword}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              {!isReadOnly && (
                <>
                  {!editMode ? (
                    <Button variant="success" onClick={handleSave}>
                      Save User
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handelUpdate(selectedUser.id)}
                    >
                      Update
                    </Button>
                  )}
                </>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Users;
