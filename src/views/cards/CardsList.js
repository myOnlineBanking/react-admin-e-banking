import React, { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { CCollapse, CButton,  CCardBody } from "@coreui/react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import BtnPlus from "../../helpers/BtnPlus";
import { useDispatch, useSelector } from "react-redux";
import { DETAILS_CARD } from "src/actions/types";
import { enableOrDisableCardAction } from "../../actions/cardActions";

const columns = [
  { key: "cardNumber" },
  { key: "csv" },
  { key: "dateExpiration", _style: { width: "40%" } },
  { key: "type", _style: { width: "20%" } },
  { key: "enabled" },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    filter: false,
    sorter: false,
    _props: { color: "", className: "fw-semibold" },
  },
];

function CardList() {
  const cardState = useSelector((state) => state["cardReducer"]);
  const history = useHistory();
  const dispatch = useDispatch();

  const [cards, setCards] = useState(cardState.cardsNotAccepted);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    setCards([...cardState.cardsNotAccepted]);
  }, [cardState.cardsNotAccepted]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const updateCardHandler = (card) => {
    dispatch({ type: DETAILS_CARD, payload: card });
    history.push({
      pathname: "/editCard",
      id: card.id,
    });
  };

  const enableCardOrDisable = (card) => {
    const { id, enabled } = card;
    Swal.fire({
      title:
        "Do you want to " + (enabled ? "disable" : "enable") + " this card?",
      showCancelButton: true,
      confirmButtonText: enabled ? "Disable" : "Enable",
    }).then((result) => {
      if (result.isConfirmed) {
        const action = enabled ? "disable" : "enable";
        dispatch(enableOrDisableCardAction({ id, action }));
      }
    });
  };

  const deleteCard = (index) => {
    Swal.fire({
      title: "Do you want to delete this card?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        // enabledCard(index);
      }
    });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center ">
        <h3>Cards List</h3>
        <BtnPlus pathname="/card" label="New Card" />
      </div>
      <CSmartTable
        columns={columns}
        items={cards}
        itemsPerPage={8}
        columnFilter
        columnSorter
        pagination
        clickableRows
        tableProps={{
          striped: true,
          hover: true,
        }}
        scopedColumns={{
          enabled: (item) =>{
            
            return(
            
            
            
            <td>
              {item.enabled ? "Active" : "Not Active"}
            </td>
            
          )},

          show_details: (item) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => toggleDetails(item.id)}
                >
                  {details.includes(item.id) ? "Hide" : "Action"}
                </CButton>
              </td>
            );
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item.id)}>
                <CCardBody>
                  <h5>{item.cardHolderName}</h5>
                  <p className="text-muted">Use since: {item.dateExpiration}</p>
                  <CButton
                    size="sm"
                    className="mx-1"
                    color="info"
                    onClick={() => updateCardHandler(item)}
                  >
                    Update
                  </CButton>

                  <CButton
                    size="sm"
                    className="mx-1"
                    color={item.enabled ? "warning" : "success"}
                    onClick={() => enableCardOrDisable(item)}
                  >
                    {item.enabled ? "disable" : "enable"}
                  </CButton>

                  <CButton
                    size="sm"
                    className="mx-1"
                    color="danger"
                    onClick={() => deleteCard(item.id)}
                  >
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
}

export default CardList;
