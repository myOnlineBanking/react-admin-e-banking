import React, { useRef, useState, useEffect } from "react";
import { getParameter } from "../../services/SettingsService";
import CIcon from "@coreui/icons-react";
import { cilSettings } from "@coreui/icons";
import { CCol, CRow } from "@coreui/react";
import Swal from "sweetalert2";

function Setting() {
  const baseURL =
    "https://my-parametrage-service.herokuapp.com/Parameter/update";

  const maxAmountForCashToCash = useRef(null);
  const maxAmountForCashToAccount = useRef(null);
  const maxAmountForAccountToCash = useRef(null);
  const maxAmountForAccountToAccount = useRef(null);
  const maxHoldingTimeForCashToCash = useRef(null);
  const maxHoldingTimeForCashToAccount = useRef(null);
  const maxHoldingTimeForAccountToCash = useRef(null);
  const maxHoldingTimeForAccountToAccount = useRef(null);
  const transferPercentageForCashToCash = useRef(null);
  const transferPercentageForCashToAccount = useRef(null);
  const transferPercentageForAccountToAccount = useRef(null);
  const transferPercentageForAccountToCash = useRef(null);

  const [list, setList] = useState([]);

  useEffect(() => {
    getParameter().then((items) => setList(items));
  }, []);

  async function updateSettings() {
    try {
      const settingData = {
        id: list.id,
        maxAmountForCashToCash: maxAmountForCashToCash.current.value,
        maxAmountForCashToAccount: maxAmountForCashToAccount.current.value,
        maxAmountForAccountToCash: maxAmountForAccountToCash.current.value,
        maxAmountForAccountToAccount:
          maxAmountForAccountToAccount.current.value,
        maxHoldingTimeForCashToCash: maxAmountForCashToCash.current.value,
        maxHoldingTimeForCashToAccount: maxAmountForCashToCash.current.value,
        maxHoldingTimeForAccountToCash: maxAmountForCashToCash.current.value,
        maxHoldingTimeForAccountToAccount: maxAmountForCashToCash.current.value,
        transferPercentageForCashToCash: maxAmountForCashToCash.current.value,
        transferPercentageForCashToAccount:
          maxAmountForCashToCash.current.value,
        transferPercentageForAccountToAccount:
          maxAmountForCashToCash.current.value,
        transferPercentageForAccountToCash:
          maxAmountForCashToCash.current.value,
      };
      const res = await fetch(baseURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settingData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      Swal.fire({
        title: "Updated!",
        text: "Settings have been changed!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        title: "Try again!",
        text: "Settings are not changed:" + err.message,
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <CIcon icon={cilSettings} /> Settings
      </div>
      <div className="card-body">
        <b>Max Amount :</b>
        <CRow>
          <CCol>
            <div className="form-group">
              <label>Cash To Cash :</label>
              <input
                type="text"
                defaultValue={list.maxAmountForCashToCash || ""}
                className="form-control"
                ref={maxAmountForCashToCash}
                placeholder="maxAmountForCashToCash"
              />
            </div>
          </CCol>
          <CCol>
            <div className="form-group">
              <label>Cash To Account :</label>
              <input
                type="text"
                className="form-control"
                defaultValue={list.maxAmountForCashToAccount || ""}
                ref={maxAmountForCashToAccount}
                placeholder="maxAmountForCashToAccount "
              />
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div className="form-group">
              <label>Account To Cash :</label>
              <input
                type="text"
                className="form-control"
                defaultValue={list.maxAmountForAccountToCash || ""}
                ref={maxAmountForAccountToCash}
                placeholder="maxAmountForAccountToCash "
              />
            </div>
          </CCol>
          <CCol>
            <div className="form-group">
              <label> Account To Account :</label>
              <input
                type="test"
                className="form-control"
                defaultValue={list.maxAmountForAccountToAccount || ""}
                ref={maxAmountForAccountToAccount}
                placeholder="maxAmountForAccountToAccount "
              />
            </div>
          </CCol>
        </CRow>

        <hr></hr>
        <b>Max Holding Time :</b>
        <CRow>
          <CCol>
            <div className="form-group">
              <label>Cash To Cash :</label>
              <input
                type="text"
                defaultValue={list.maxHoldingTimeForCashToCash || ""}
                className="form-control"
                ref={maxHoldingTimeForCashToCash}
                placeholder="maxHoldingTimeForCashToCash"
              />
            </div>
          </CCol>
          <CCol>
            <div className="form-group">
              <label>Cash To Account :</label>
              <input
                type="text"
                className="form-control"
                defaultValue={list.maxHoldingTimeForCashToAccount || ""}
                ref={maxHoldingTimeForCashToAccount}
                placeholder="maxHoldingTimeForCashToAccount "
              />
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div className="form-group">
              <label>Account To Cash :</label>
              <input
                type="text"
                className="form-control"
                defaultValue={list.maxHoldingTimeForAccountToCash || ""}
                ref={maxHoldingTimeForAccountToCash}
                placeholder="maxHoldingTimeForAccountToCash "
              />
            </div>
          </CCol>
          <CCol>
            <div className="form-group">
              <label> Account To Account :</label>
              <input
                type="test"
                className="form-control"
                defaultValue={list.maxHoldingTimeForAccountToAccount || ""}
                ref={maxHoldingTimeForAccountToAccount}
                placeholder="maxHoldingTimeForAccountToAccount "
              />
            </div>
          </CCol>
        </CRow>

        <hr></hr>
        <b>Transfer Percentage :</b>
        <CRow>
          <CCol>
            <div className="form-group">
              <label>Cash To Cash :</label>
              <input
                type="text"
                defaultValue={list.transferPercentageForCashToCash || ""}
                className="form-control"
                ref={transferPercentageForCashToCash}
              />
            </div>
          </CCol>
          <CCol>
            <div className="form-group">
              <label>Cash To Account :</label>
              <input
                type="text"
                className="form-control"
                defaultValue={list.transferPercentageForCashToAccount || ""}
                ref={transferPercentageForCashToAccount}
              />
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div className="form-group">
              <label>Account To Cash :</label>
              <input
                type="text"
                className="form-control"
                defaultValue={list.transferPercentageForAccountToCash || ""}
                ref={transferPercentageForAccountToCash}
              />
            </div>
          </CCol>
          <CCol>
            <div className="form-group">
              <label> Account To Account :</label>
              <input
                type="test"
                className="form-control"
                defaultValue={list.transferPercentageForAccountToAccount || ""}
                ref={transferPercentageForAccountToAccount}
              />
            </div>
          </CCol>
        </CRow>

        <br></br>
        <div className="form-group">
          <button
            className="btn btn-secondary btn-lg btn-block"
            onClick={() => updateSettings()}
          >
            Update Settings
          </button>
        </div>
        <br></br>
      </div>
    </div>
  );
}

export default Setting;
