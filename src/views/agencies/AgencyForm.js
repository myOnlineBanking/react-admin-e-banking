import React, { useRef, useState, useEffect } from "react";
 import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAgencyAction } from "src/actions/agencyAction";

function AgencyForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const name = useRef(null);
  const location = useRef(null);
  const city = useRef(null);
  const idAgent = useRef(null);

  const clientState = useSelector(state=> state['userReducer'] )
  const [list, setList] = useState([]);
  useEffect(() => {
    setList([...clientState.users]);
  }, [clientState.users]);

  const createAgency = async () => {
    const data = {
      name: name.current.value,
      location: location.current.value,
      city: city.current.value,
      idAgent: idAgent.current.value,
    };

    try {
      const res = await dispatch(createAgencyAction(data));
      if (res["id"]) {
        Swal.fire({
          title: "Saved!",
          text: "New account has been added",
          icon: "success",
          confirmButtonText: "Ok",
        });
        history.push({
          pathname: "/agencies",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Try again!",
        text: "Account has not been saved:" + err.message,
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <i className="fa fa-plus mx-1"></i>
        Add New Agency
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Select Agent : </label>
          <select className="form-control">
            {list.map((item) => (
              <option ref={idAgent} value={item.id} key={item.id}>
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
            ref={name}
            placeholder="Name"
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={location}
            placeholder="Location "
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            ref={city}
            placeholder="City "
          />
        </div>
        <br></br>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => createAgency()}
        >
          Add Agency
        </button>
      </div>
    </div>
  );
}

export default AgencyForm;
