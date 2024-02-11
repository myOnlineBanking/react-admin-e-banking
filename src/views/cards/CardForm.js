import React, { useState, useEffect } from "react";
import { getListAccountsAction } from "../../actions/accountAction";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { createCardAction } from "src/actions/cardActions";
import { useHistory } from "react-router-dom";

function CardForm() {
  const history = useHistory();
  const accountState = useSelector((state) => state["accountReducer"]);
  const [list, setList] = useState(accountState.allAccounts);
  const [cardFields, setCardFields] = useState({
    accountId: "",
    cardNumber: "",
    csv: "",
    dateExpiration: "",
    type: "MASTERCARD",
  });

  const dispatch = useDispatch();

  const onChangeCardHandler = (e, field) => {
    setCardFields({ ...cardFields, [field]: e.target.value });
  };

  useEffect(() => {
    dispatch(getListAccountsAction());
  }, []);

  useEffect(() => {
    setList([...accountState.allAccounts]);
    setCardFields({
      ...cardFields,
      accountId:
        accountState.allAccounts.length > 0
          ? accountState.allAccounts[0].id
          : "",
    });
  }, [accountState.allAccounts]);

  const creatCard = async () => {
    try {
      const validateCardFields = {
        ...cardFields,
        csv: parseInt(cardFields.csv),
      };
      const res = await dispatch(createCardAction(validateCardFields));
      if (res["id"]) {
        Swal.fire({
          title: "Saved!",
          text: "New card has been saved",
          icon: "success",
          confirmButtonText: "Ok",
        });
        history.push({ pathname: "/cards" });
      }
    } catch (err) {
      Swal.fire({
        title: "Try again!",
        text: "Card has not been saved:" + err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <i className="fa fa-plus mx-1"></i>
        Add New Card
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Select Account Number : </label>
          <select
            className="form-control"
            value={cardFields.accountId}
            onChange={(e) => onChangeCardHandler(e, "accountId")}
          >
            {list.map((item) => (
              <option value={item.id} key={item.id}>
                {item.accountNumber}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="cardNumber "
            value={cardFields.cardNumber}
            onChange={(e) => onChangeCardHandler(e, "cardNumber")}
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="csv "
            value={cardFields.csv}
            onChange={(e) => onChangeCardHandler(e, "csv")}
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            placeholder="dateExpiration"
            value={cardFields.dateExpiration}
            onChange={(e) => onChangeCardHandler(e, "dateExpiration")}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label>Select Card Type :</label>
          <select
            className="form-control"
            value={cardFields.type}
            onChange={(e) => onChangeCardHandler(e, "type")}
          >
            <option value={"MASTERCARD"}>MASTERCARD</option>
            <option value={"VISA"}>VISA</option>
            <option value={"VIRTUAL"}>VIRTUAL</option>
          </select>
        </div>
        <br></br>
        <button className="btn btn-sm btn-primary" onClick={() => creatCard()}>
          Add Card
        </button>
      </div>
    </div>
  );
}

export default CardForm;
