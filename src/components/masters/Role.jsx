import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

const Role = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [description, setDescription] = useState("");
  const [roleName, setRoleName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/roles/all");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching role data:", error);
      toast.error("Error fetching role data");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/roles/save", {
        roleName,
        description,
      });
      setData([...data, response.data]);

      toast.success("Role saved successfully");
      setShow(false);
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error("Error saving role");
    }
  };

  const handleView = (id) => {
    const role = data.find((item) => item.id === id);
    if (role) {
      setId(id);
      setDescription(role.description);
      setRoleName(role.roleName);
      setIsReadOnly(true);
      setIsUpdate(false);
      handleShow();
    }
  };

  const handleEdit = (id) => {
    const role = data.find((item) => item.id === id);
    if (role) {
      setId(id);
      setDescription(role.description);
      setRoleName(role.roleName);
      setIsReadOnly(false);
      setIsUpdate(true);
      handleShow();
    }
  };

  const handelUpdate = async (id) => {
    try {
      await axios.put(`/roles/update`, {
        id: id,
        roleName: roleName,
        description: description,
      });
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, roleName, description } : item
      );
      setData(updatedData);
      toast.success("Role updated successfully");
      setShow(false);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Error updating role");
    }
  };

  const handelDelete = async (id) => {
    try {
      await axios.delete(`/roles/delete/${id}`);
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      toast.success("Role deleted successfully");
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Error deleting role");
    }
  };

  return (
    <div className="container">
      <div className="crud shadow-lg border mb-5 mt-3 p-4 rounded ">
        <div className="row">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Role.."
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
              <b>Role Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred pl">
            <Button variant="primary" onClick={handleShow}>
              Add New Role
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>Sl.</th>
                  <th>Role Name</th>
                  <th>Description</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.roleName} </td>
                      <td>{item.description}</td>
                      <td>{item.created}</td>
                      <td>{item.updated}</td>
                      <td className="d-flex justify-content-center align-items-center">
                        <Link
                          to="#"
                          className="view"
                          title="View"
                          data-toggle="tooltip"
                          style={{ color: "#10ab80" }}
                          onClick={() => handleView(item.id)}
                        >
                          <i className="material-icons">&#xE417;</i>
                        </Link>
                        &nbsp;
                        <Link
                          to="#"
                          className="edit"
                          title="Edit"
                          data-toggle="tooltip"
                          onClick={() => handleEdit(item.id)}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </Link>
                        &nbsp;
                        <Link
                          to="#"
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          onClick={() => handelDelete(item.id)}
                          style={{ color: "red" }}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </Link>
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
          >
            <Modal.Header closeButton>
              {!isUpdate ? (
                <Modal.Title>
                  {isReadOnly ? "Role Details" : "Create Role"}
                </Modal.Title>
              ) : (
                <Modal.Title>Edit Role</Modal.Title>
              )}
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="role" className="form-label">
                      Role Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Role Name"
                      onChange={(e) => setRoleName(e.target.value)}
                      value={roleName}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="branch_name" className="form-label">
                      Description<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="branch_name"
                      id="branch_name"
                      placeholder="Enter Description.."
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
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
                  {!isUpdate ? (
                    <Button variant="success" onClick={(e) => handleSave(e)}>
                      Save Role
                    </Button>
                  ) : (
                    <Button variant="success" onClick={() => handelUpdate(id)}>
                      Update Role
                    </Button>
                  )}
                </>
              )}
            </Modal.Footer>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
};

export default Role;
