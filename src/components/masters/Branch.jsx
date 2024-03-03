import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

const Branch = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [branchCode, setBranchCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/branch/all");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching branch data:", error);
      toast.error("Error fetching branch data");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/branch/save", {
        branchCode,
        branchName,
      });
      setData([...data, response.data]);
      toast.success("Branch saved successfully");
      setShow(false);
    } catch (error) {
      console.error("Error saving branch:", error);
      toast.error("Error saving branch");
    }
  };

  const handleView = (id) => {
    const branch = data.find((item) => item.id === id);
    if (branch) {
      setId(id);
      setBranchCode(branch.branchCode);
      setBranchName(branch.branchName);
      setIsReadOnly(true);
      setIsUpdate(false);
      handleShow();
    }
  };

  const handelEdit = (id) => {
    const branch = data.find((item) => item.id === id);
    if (branch) {
      setId(id);
      setBranchCode(branch.branchCode);
      setBranchName(branch.branchName);
      setIsReadOnly(false);
      setIsUpdate(true);
      handleShow();
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/branch/update`, {
        id,
        branchCode,
        branchName,
      });
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, branchCode, branchName } : item
      );
      setData(updatedData);
      toast.success("Branch updated successfully");
      setShow(false);
    } catch (error) {
      console.error("Error updating branch:", error);
      toast.error("Error updating branch");
    }
  };

  const handelDelete = async (id) => {
    try {
      await axios.delete(`/branch/delete/${id}`);
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      toast.success("Branch deleted successfully");
    } catch (error) {
      console.error("Error deleting branch:", error);
      toast.error("Error deleting branch");
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
                  placeholder="Search Branch"
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
              <b>Branch Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred pl">
            <Button variant="primary" onClick={handleShow}>
              Add New Branch
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>Sl.</th>
                  <th>Branch Code</th>
                  <th>Branch Name </th>
                  {/* <th>Address</th> */}
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
                      <td>{item.branchCode} </td>
                      <td>{item.branchName}</td>
                      {/* <td>{item.address}</td> */}
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
                          <i class="material-icons">&#xE417;</i>
                        </Link>
                        &nbsp;
                        <Link
                          to="#"
                          className="edit"
                          title="Edit"
                          data-toggle="tooltip"
                          onClick={() => handelEdit(item.id)}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </Link>
                        &nbsp;
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
                  {isReadOnly ? "Branch Details" : "Create Branch"}
                </Modal.Title>
              ) : (
                <Modal.Title>Edit Branch</Modal.Title>
              )}
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="branch_cd" className="form-label">
                      Branch Code<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="branch_c"
                      id="branch_c"
                      placeholder="Enter Branch Code"
                      className="form-control"
                      onChange={(e) => setBranchCode(e.target.value)}
                      value={branchCode}
                      readOnly={isReadOnly}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="branch_name" className="form-label">
                      Branch Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="branch_name"
                      id="branch_name"
                      placeholder="Enter Branch Name"
                      className="form-control"
                      onChange={(e) => setBranchName(e.target.value)}
                      value={branchName}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col">
                    <label htmlFor="address" className="form-label">
                      Address<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter Address"
                      className="form-control"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div> */}
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
                      Save Branch
                    </Button>
                  ) : (
                    <Button variant="success" onClick={handleUpdate}>
                      Update Branch
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

export default Branch;
