import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getListAccountsAction } from "src/actions/accountAction";
import { updateCardAction } from "src/actions/cardActions";

function UpdateCard() {
  const dispatch = useDispatch();

  const accountState = useSelector((state) => state["accountReducer"]);
  const cardState = useSelector((state) => state["cardReducer"]);

  const [list, setList] = useState([]);
  const [card, setCard] = useState({});
  const [cardFields, setCardFields] = useState({
    accountId: "",
    cardNumber: "",
    csv: "",
    dateExpiration: "",
    type: "MASTERCARD",
  });

  useEffect(() => {
    dispatch(getListAccountsAction());
  }, []);

  useEffect(() => {
    setList([...accountState.allAccounts]);
    if (accountState.allAccounts.length > 0) {
      setCardFields({
        ...cardFields,
        accountId: accountState.allAccounts[0]["id"],
      });
    }
    setCard({ ...cardState.cardDetails });
  }, [accountState.allAccounts, cardState.cardDetails]);

  const onChangeCardHandler = (e, field) => {
    setCardFields({ ...cardFields, [field]: e.target.value });
  };

  const updateCardhandler = async () => {
    try {
      const res = await dispatch(
        updateCardAction({
          ...card,
          ...cardFields,
          csv: parseInt(cardFields.csv),
        })
      );
      if (res["id"]) {
        dispalySwal({
          title: "Updated!",
          text: "this card has been updated",
          icon: "success",
        });
      }
    } catch (err) {
      dispalySwal({
        title: "Try again!",
        text: "Card has not been updated:" + err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header text-center">
        <i className="fa fa-pencil mx-1"></i> Update Card
      </div>
      {card && card["type"] && (
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
              className="form-control"
              placeholder="cardNumber"
              value={cardFields.cardNumber}
              onChange={(e) => onChangeCardHandler(e, "cardNumber")}
            />
          </div>
          <br></br>
          <div className="form-group">
            <input
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
              placeholder="dateExpiration "
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
              <option value="MASTERCARD">MASTERCARD</option>
              <option value="VISA">VISA</option>
              <option value="VIRTUAL">VIRTUAL</option>
            </select>
          </div>
          <br></br>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => updateCardhandler()}
          >
            Update Card
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateCard;

const dispalySwal = ({ title, text, icon }) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "Ok",
  });
};
