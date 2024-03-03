import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const FormData = () => {
  const [formData, setFormData] = useState({
    customerSerialId: "",
    collectionDate: "",
    customername: "",
    dob: "",
    panNo: "",
    phoneNo: "",
    phoneNo1: "",
    aadharNo: "",
    address: "",
    branchName: "",
    renewalOrFresh: "",
    email: "",
    year: "",
    model: "",
    fuel: "",
    cc: "",
    vehicleRegistrationNo: "",
    insuranceCompany: "",
    currentPolicyNo: "",
    expiryDate: "",
    riskStartDate: "",
    paymentMode: "",
    paidBy: "",
    amount: "",
    chequeNo: "",
    bankName: "",
    shortfallAmount: "",
    shortfallChequeNo: "",
    shortfallReceipt: "",
    totalGrossPremium: "",
    idv: "",
    idvType: "",
    ncb: "",
    plans: "",
    thirdPartyPremium: "",
    netPremium: "",
    odPremium: "",
    remarks: "",
    referredByName: "",
    referredByPhoneNo: "",
    code: "",
    createdAt: "",
    updatedAt: "",
  });
  const [data, setData] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/customer/all")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSave = () => {
    axios
      .post("/customer/save", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle success response
        console.log("Data saved successfully:", response.data);
        toast.success("Data saved successfully");
        handleClose();
        // Optionally, you can reset the form data state after successful save
        setFormData({
          customerSerialId: "",
          collectionDate: "",
          customername: "",
          dob: "",
          panNo: "",
          phoneNo: "",
          phoneNo1: "",
          aadharNo: "",
          address: "",
          branchName: "",
          renewalOrFresh: "",
          email: "",
          year: "",
          model: "",
          fuel: "",
          cc: "",
          vehicleRegistrationNo: "",
          insuranceCompany: "",
          currentPolicyNo: "",
          expiryDate: "",
          riskStartDate: "",
          paymentMode: "",
          paidBy: "",
          amount: "",
          chequeNo: "",
          bankName: "",
          shortfallAmount: "",
          shortfallChequeNo: "",
          shortfallReceipt: "",
          totalGrossPremium: "",
          idv: "",
          idvType: "",
          ncb: "",
          plans: "",
          thirdPartyPremium: "",
          netPremium: "",
          odPremium: "",
          remarks: "",
          referredByName: "",
          referredByPhoneNo: "",
          code: "",
          createdAt: "",
          updatedAt: "",
        });
      })
      .catch((error) => {
        console.error("Error while saving data:", error);
        toast.error("Failed to Save Data");
      });
  };
  const handleView = (data) => {
    handleShow();
    setShow(true);
    setFormData(data);
    setEditMode(false);
    setIsReadOnly(true);
  };

  const handelEdit = (id) => {
    const user = data.find((item) => item.id === id);
    if (user) {
      setFormData(user);
      setEditMode(true);
      setIsUpdate(true);
      handleShow();
    }
  };

  const handleUpdate = () => {
    axios
      .put(`/customer/update`, formData, {
        params: { id: formData.id }, // Pass the customer ID as a query parameter
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const updatedCustomer = response.data;
        console.log(updatedCustomer);
        const updatedData = data.map((item) =>
          item.id === formData.id ? updatedCustomer : item
        );
        setData(updatedData);
        toast.success("Customer updated successfully");
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
        toast.error("Failed to update customer");
      });
  };

  const handleDelete = (id) => {
    if (id) {
      if (window.confirm("Are you sure to delete this item?")) {
        axios
          .delete(`/customer/delete/${id}`)
          .then((response) => {
            const updatedUsers = data.filter((user) => user.id !== id);
            setData(updatedUsers);
            toast.success("User deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
          });
      }
    } else {
      console.error("Invalid user ID:", id);
    }
  };

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;

    if (name === "paymentMode") {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        chequeNo: value === "Online" ? "" : prev.chequeNo,
      }));
    } else {
      // For other fields, update the formData normally
      let updatedFormData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      };

      // Calculate total gross premium if the changed field is amount or shortfall amount
      if (name === "amount" || name === "shortfallAmount") {
        const amount = parseFloat(updatedFormData.amount || 0);
        const shortfallAmount = parseFloat(
          updatedFormData.shortfallAmount || 0
        );
        updatedFormData.totalGrossPremium = amount + shortfallAmount;
      }

      setFormData(updatedFormData);
    }
  }

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container border shadow rounded p-4  formData mt-3">
      <div className="row">
        <div className="col-sm-3 mt-5 mb-4 text-gred">
          <div className="search">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search Data Entry"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
        <div
          className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
          style={{ color: "green" }}
        >
          <p>
            <b>Data Entry Details</b>
          </p>
        </div>
        <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred pl">
          <Button variant="primary" onClick={handleShow}>
            Add New Data
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered text-center">
            <thead>
              <tr>
                <th>Sl.</th>
                <th>Customer Name</th>
                <th>Phone no</th>
                <th>Vehicle reg no</th>
                <th>Inc.Company</th>
                <th>Expiary Date</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.customerSerialId}</td>
                    <td>{item.customername} </td>
                    <td>{item.phoneNo}</td>
                    <td>{item.vehicleRegistrationNo}</td>
                    <td>{item.insuranceCompany}</td>
                    <td>{item.expiryDate}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td>
                      {new Date(item.updatedAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="d-flex justify-content-center align-items-center">
                      <Link
                        to="#"
                        className="view"
                        title="View"
                        data-toggle="tooltip"
                        style={{ color: "#10ab80" }}
                        onClick={() => handleView(item)}
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
                        onClick={() => handleDelete(item.id)}
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
      <div className="row">
        <div className="col-sm-6 mt-3">
          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              className="modal-lg"
            >
              <Modal.Header closeButton className="container-xl">
                <Modal.Title>Create new data</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <label htmlFor="customerSerialId" className="form-label">
                        Customer Serial ID<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        name="customerSerialId"
                        id="customerSerialId"
                        placeholder="Customer Serial ID"
                        className="form-control"
                        value={formData.customerSerialId}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                        disabled
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="collectionDate" className="form-label">
                        Collection Date<sup>*</sup>
                      </label>
                      <input
                        type="date"
                        name="collectionDate"
                        id="collectionDate"
                        className="form-control"
                        value={formData.collectionDate || getCurrentDate()}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="customername" className="form-label">
                        Customer/Company Name<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Customer Name"
                        name="customername"
                        id="customername"
                        className="form-control"
                        value={formData.customername}
                        onChange={changeHandler}
                        required
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="dob" className="form-label">
                        D.O.B
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Date of Birth"
                        className="form-control"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="panNo" className="form-label">
                        PAN
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Pan No."
                        id="panNo"
                        name="panNo"
                        value={formData.panNo}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="aadharNo" className="form-label">
                        Aadhar No
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Aadhar no."
                        className="form-control"
                        id="aadharNo"
                        name="aadharNo"
                        value={formData.aadharNo}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="address" className="form-label">
                        Address<sup>*</sup>
                      </label>
                      <textarea
                        type="date"
                        className="form-control"
                        placeholder="Enter Address...."
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="phoneNo" className="form-label">
                        Phone No.<sup>*</sup>
                      </label>
                      <input
                        type="tel"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="+91-1234567899"
                        className="form-control"
                        value={formData.phoneNo}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="phoneNo1" className="form-label">
                        Phone 1
                      </label>
                      <input
                        type="tel"
                        name="phoneNo1"
                        id="phoneNo1"
                        className="form-control"
                        value={formData.phoneNo1}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mt-2">
                      <label htmlFor="branchName" className="form-label">
                        Branch Name<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        id="branchName"
                        name="branchName"
                        value={formData.branchName}
                        onChange={changeHandler}
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col mt-2">
                      <label htmlFor="tcName" className="form-label">
                        TC Name<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        id="tcName"
                        name="tcName"
                        value={formData.tcName}
                        onChange={changeHandler}
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mt-3">
                      <fieldset className="col mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">
                          Renewal/Fresh<sup>*</sup>
                        </legend>
                        <div className="col-sm-10 d-flex gap-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="renewalRadio"
                              name="renewalOrFresh"
                              value="R"
                              checked={formData.renewalOrFresh === "R"}
                              onChange={changeHandler}
                              required
                              readOnly={isReadOnly}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="renewalRadio"
                            >
                              R
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="freshRadio"
                              name="renewalOrFresh"
                              value="F"
                              checked={formData.renewalOrFresh === "F"}
                              onChange={changeHandler}
                              readOnly={isReadOnly}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="freshRadio"
                            >
                              F
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="col mt-1">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter Email Id"
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="manufacturingYear" className="form-label">
                        Manufacturing Year<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={changeHandler}
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>

                    <div className="col">
                      <label htmlFor="model" className="form-label">
                        Model/fuel/cc<sup>*</sup>
                      </label>

                      <div class="input-group">
                        <input
                          type="text"
                          id="model"
                          name="model"
                          value={formData.model}
                          onChange={changeHandler}
                          className="form-control"
                          placeholder="model"
                          readOnly={isReadOnly}
                        />
                        <select
                          className="form-select"
                          id="fuel"
                          name="fuel"
                          value={formData.fuel}
                          onChange={changeHandler}
                          aria-label="Fuel Type"
                          disabled={isReadOnly}
                        >
                          <option value="">Select fuel</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="CNG">CNG</option>
                          <option value="Electric">Electric</option>
                        </select>

                        <input
                          type="text"
                          id="cc"
                          name="cc"
                          value={formData.cc}
                          onChange={changeHandler}
                          className="form-control"
                          placeholder="cc"
                          readOnly={isReadOnly}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label
                        htmlFor="vehicleRegistrationNo"
                        className="form-label"
                      >
                        Vehicle Reg. No.<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        id="vehicleRegistrationNo"
                        name="vehicleRegistrationNo"
                        value={formData.vehicleRegistrationNo}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter Vehicle Registration No."
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="Insurance_comp" className="form-label">
                        Insurance Company<sup>*</sup>
                      </label>
                      <select
                        className="form-select"
                        id="insuranceCompany"
                        name="insuranceCompany"
                        value={formData.insuranceCompany}
                        onChange={changeHandler}
                        aria-label="Default select example"
                        disabled={isReadOnly}
                      >
                        <option selected>Select Insurace Company Name</option>
                        <option value="TATA AIG">TATA AIG</option>
                        <option value="ICICI LOMBARD ">ICICI LOMBARD </option>
                        <option value="HDFC ERGO">HDFC ERGO</option>
                        <option value="RELIANCE">RELIANCE</option>
                        <option value="LIBERTY">LIBERTY</option>
                        <option value="FUTURE">FUTURE</option>
                        <option value="KOTAK MAHINDRA">KOTAK MAHINDRA</option>
                        <option value="GO DIGIT">GO DIGIT</option>
                        <option value="SBI">SBI</option>
                        <option value="ROYAL SUNDARAM ">ROYAL SUNDARAM </option>
                        <option value="BAJAJ ALLIANZ">BAJAJ ALLIANZ</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="currentPolicyNo" className="form-label">
                        Current Policy No.<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        id="currentPolicyNo"
                        name="currentPolicyNo"
                        value={formData.currentPolicyNo}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter Policy Number"
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="expiryDate" className="form-label">
                        Expiry Date<sup>*</sup>
                      </label>
                      <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={changeHandler}
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="riskStartDate" className="form-label">
                        Risk Start Date<sup>*</sup>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="riskStartDate"
                        name="riskStartDate"
                        value={formData.riskStartDate}
                        onChange={changeHandler}
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="payment_mode" className="form-label">
                        Payment Mode<sup>*</sup>
                      </label>
                      <br />
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          id="payment_mode_online"
                          name="paymentMode"
                          value="Online"
                          type="radio"
                          checked={formData.paymentMode === "Online"}
                          onChange={changeHandler}
                          readOnly={isReadOnly}
                        />
                        <label className="form-check-label" htmlFor="Online">
                          Online
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMode"
                          id="Cheque"
                          value="Cheque"
                          checked={formData.paymentMode === "Cheque"}
                          onChange={changeHandler}
                          readOnly={isReadOnly}
                        />
                        <label className="form-check-label" htmlFor="Cheque">
                          Cheque
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="paidBy" className="form-label">
                        Paid By<sup>*</sup>
                      </label>
                      <select
                        id="paidBy"
                        name="paidBy"
                        value={formData.paidBy}
                        onChange={changeHandler}
                        className="form-select"
                        aria-label="Default select example"
                        disabled={isReadOnly}
                      >
                        <option selected>Paid by</option>
                        <option value="Company">Company</option>
                        <option value="Agent">Agent</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="amount" className="form-label">
                        Amount<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={formData.amount}
                        name="amount"
                        onChange={changeHandler}
                        placeholder="Enter Amount.."
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="chequeNo" className="form-label">
                        Cheque No.<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Cheque no."
                        id="chequeNo"
                        name="chequeNo"
                        value={formData.chequeNo}
                        onChange={changeHandler}
                        className="form-control"
                        disabled={formData.paymentMode === "Online"}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="bankName" className="form-label">
                        Bank Name<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter Bank Name.."
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="shortfall_amt" className="form-label">
                        Shortfall Amount<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Shortfall Amount.."
                        id="shortfallAmount"
                        name="shortfallAmount"
                        value={formData.shortfallAmount}
                        onChange={changeHandler}
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="shortfallChequeNo" className="form-label">
                        Shortfall Chq No./Recepit No.<sup>*</sup>
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          id="shortfallChequeNo"
                          name="shortfallChequeNo"
                          value={formData.shortfallChequeNo}
                          onChange={changeHandler}
                          className="form-control"
                          placeholder="Shortfall Cheque"
                          readOnly={isReadOnly}
                        />
                        <input
                          type="number"
                          id="shortfallReceipt"
                          name="shortfallReceipt"
                          value={formData.shortfallReceipt}
                          onChange={changeHandler}
                          className="form-control"
                          placeholder="Receipt No.."
                          readOnly={isReadOnly}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label htmlFor="totalGrossPremium" className="form-label">
                        Total Gross Premium<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        id="totalGrossPremium"
                        name="totalGrossPremium"
                        value={formData.totalGrossPremium}
                        onChange={changeHandler}
                        placeholder="Enter Gross Premium Amount.."
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="idv" className="form-label">
                        IDV<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        id="idv"
                        name="idv"
                        value={formData.idv}
                        onChange={changeHandler}
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="idvType" className="form-label">
                        IDV CNG/ELEC/NON-ELEC
                      </label>
                      <input
                        type="text"
                        id="idvType"
                        name="idvType"
                        value={formData.idvType}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="IDV Type"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="ncb" className="form-label">
                        NCB<sup>*</sup>
                      </label>
                      <select
                        id="ncb"
                        name="ncb"
                        value={formData.ncb}
                        onChange={changeHandler}
                        className="form-select"
                        aria-label="Default select example"
                        disabled={isReadOnly}
                      >
                        <option selected>Open this select menu</option>
                        <option value="0">0</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="35">35</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="65">65</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="plans" className="form-label">
                        Plans<sup>*</sup>
                      </label>
                      <select
                        className="form-select"
                        id="plans"
                        name="plans"
                        value={formData.plans}
                        onChange={changeHandler}
                        aria-label="Default select example"
                        disabled={isReadOnly}
                      >
                        <option selected>Open this select menu</option>
                        <option value="d">d</option>
                        <option value="c">c</option>
                        <option value="e">e</option>
                        <option value="t">t</option>
                        <option value="r">r</option>
                        <option value="k">k</option>
                        <option value="pb">pb</option>
                        <option value="eth">eth</option>
                        <option value="ncb">ncb</option>
                        <option value="rsa">rsa</option>
                        <option value="owner">owner</option>
                        <option value="driver">driver</option>
                        <option value="passenger">passenger</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="thirdPartyPremium" className="form-label">
                        Third Party Premium<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        id="thirdPartyPremium"
                        value={formData.thirdPartyPremium}
                        name="thirdPartyPremium"
                        onChange={changeHandler}
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="netPremium" className="form-label">
                        Net Premium<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        id="netPremium"
                        name="netPremium"
                        value={formData.netPremium}
                        onChange={changeHandler}
                        placeholder="Enter Net Premium Amount.."
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="odPremium" className="form-label">
                        OD Premium<sup>*</sup>
                      </label>
                      <input
                        type="number"
                        id="odPremium"
                        name="odPremium"
                        value={formData.odPremium}
                        onChange={changeHandler}
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="remarks" className="form-label">
                        Special Remarks By Caller<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        id="remarks"
                        name="remarks"
                        value={formData.remarks}
                        onChange={changeHandler}
                        placeholder="Enter comment..."
                        className="form-control"
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="referredBy" className="form-label">
                        Referred By
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="referredByName"
                          name="referredByName"
                          value={formData.referredByName}
                          onChange={changeHandler}
                          className="form-control"
                          placeholder="Enter Name"
                          readOnly={isReadOnly}
                        />
                        <input
                          type="number"
                          id="referredByPhoneNo"
                          name="referredByPhoneNo"
                          value={formData.referredByPhoneNo}
                          onChange={changeHandler}
                          className="form-control"
                          placeholder="Phone Number.."
                          readOnly={isReadOnly}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label htmlFor="code" className="form-label">
                        Code<sup>*</sup>
                      </label>
                      <select
                        className="form-select"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={changeHandler}
                        aria-label="Default select example"
                        disabled={isReadOnly}
                      >
                        <option selected>Open this select menu</option>
                        <option value="RG">RG</option>
                        <option value="JK">JK</option>
                        <option value="PC">PC</option>
                        <option value="JY">JY</option>
                      </select>
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
                      <Button variant="success" onClick={handleUpdate}>
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
    </div>
  );
};

export default FormData;
