import React, { useRef, useState, useEffect } from "react";
import {
  getAccount,
  updateURL,
} from "../../services/AccountService";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function UpdateAccount() {
  const location = useLocation();
  const [account, setAccount] = useState([]);

  useEffect(() => {
    getAccount(location["id"]).then((items) => setAccount(items));
  }, []);

  const accountNumber = useRef(null);
  const balance = useRef(null);
  const currency = useRef(null);
  const userId = useRef(null);
  const type = useRef(null);

  const clientState = useSelector(state=> state['userReducer'] )
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([...clientState.users]);
  }, [clientState.users]);


  async function postData() {
    try {
      const res = await fetch(updateURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      Swal.fire({
        title: "Updated!",
        text: "This account has been updated",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        title: "Try again!",
        text: "Account has not been updated:" + err.message,
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  }

  return (
    <div className="card">
      <div className="card-header text-center ">
        <i className="fa fa-pencil mx-1"></i>
        Update Account
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Select User : </label>
          <select className="form-control">
            {list.map((item) => (
              <option ref={userId} value={item.id} key={item.id}>
                {item.username}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            defaultValue={account.accountNumber || ""}
            ref={accountNumber}
            placeholder="accountNumber"
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            defaultValue={account.balance || ""}
            ref={balance}
            placeholder="balance "
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            defaultValue={account.currency || ""}
            ref={currency}
            placeholder="currency "
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Select Account Type :</label>
          <select className="form-control">
            <option ref={type} value={account.type || ""}>
              {account.type || ""}
            </option>
            <option ref={type} value={"SAVING"}>
              SAVING
            </option>
            <option ref={type} value={"NORMAL"}>
              NORMAL
            </option>
          </select>
        </div>
        <br></br>
        <button className="btn btn-sm btn-primary" onClick={postData}>
          Update Account
        </button>
      </div>
    </div>
  );
}

export default UpdateAccount;
