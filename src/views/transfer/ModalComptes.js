import {
  CBadge,
  CButton,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_DATA_DESTINATAIRE, SET_DATA_SOURCE } from "src/actions/types";
import EmptyData from "src/helpers/EmptyData";

const ModalComptes = ({ from, visible, setVisible, step, handelFullModal }) => {
  const dispatch = useDispatch();
  const accountState = useSelector(state => state['accountReducer'])
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);


  useEffect(() => { 
    const ownAccounts = accountState['accountsByUser']
    if(ownAccounts && ownAccounts.length > 0){
      setAccounts([...ownAccounts]);
      const principalAccount = ownAccounts.find((account) => account.principal);
      setSelectedAccount(principalAccount);
    }
  }, [accountState]);

  const closeModal = () => {
    const myComptes = accounts.map((item) => {
      return { ...item, checked: item.isPrincipal };
    });

    setAccounts(myComptes);
    setVisible(false);
  };

  const selecteAccountToTransfer = (item) =>{
    setSelectedAccount(item);
  } 


  const saveCompteSelected = () => { 
    if (selectedAccount) {
      if (step === undefined || step === 0) {
        dispatch({
          type: SET_DATA_SOURCE,
          payload: { compte:selectedAccount },
        });
      } else {
        dispatch({
          type: SET_DATA_DESTINATAIRE,
          payload: { compte:selectedAccount },
        });
      }

      setVisible(false);
      if (from !== "modal") {
        handelFullModal(true);
      }
    }else{
      alert("Veuillez selectionner un compte");
    }
  };

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={() => closeModal()}>
        <CModalHeader>
          <CModalTitle>Choisir un compte </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            {accounts.length > 0 ? (
              accounts.map((item, index) => (
                <CListGroupItem
                  key={index}
                  onClick={() => selecteAccountToTransfer(item)}
                  className={classNames(
                    "d-flex justify-content-between align-items-center cursor-pointer ",
                    {
                      active:
                        selectedAccount && item["id"] === selectedAccount["id"],
                    }
                  )}
                >
                  {item["accountNumber"]}
                  <CBadge color="primary" shape="rounded-pill">
                    {item["type"]}
                  </CBadge>
                </CListGroupItem>
              ))
            ) : (
              <EmptyData text="No Account Found" />
            )}
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            onClick={() => saveCompteSelected()}
            color="primary"
            disabled={!selectedAccount}
          >
            Next
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ModalComptes;
