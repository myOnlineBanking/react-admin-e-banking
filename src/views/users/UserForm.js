/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  cilCreditCard,
  cilLockLocked,
  cilPencil,
  cilSave,
  cilSettings,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTooltip,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_ACCOUNT } from "src/actions/types";
import classNames from "classnames";
import {
  enableOrDisableCardAction,
  fetchCardsByAccountId,
} from "src/actions/cardActions";
import EmptyData from "src/helpers/EmptyData";
import Swal from "sweetalert2";
import { updateUserAction } from "src/actions/userActions";
import { enableOrDisableAccountAction } from "src/actions/accountAction";

function UserForm({ visible, setVisible }) {
  const [activeTab, setActiveTab] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [accountsByClient, setAccountsByClient] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [cardsByClient, setCardsByClient] = useState([]);

  const userState = useSelector((state) => state["userReducer"]);
  const accountState = useSelector((state) => state["accountReducer"]);
  const cardState = useSelector((state) => state["cardReducer"]);

  const dispatch = useDispatch();

  useEffect(() => {
    setAccountsByClient(accountState.accountsByUser);
    setSelectedClient(userState.user);
    setCardsByClient(cardState.cardsByUser);
  }, [accountState, cardState]);

  const activeTabHandler = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const getAccountInfo = (account) => {
    dispatch({ type: SET_SELECTED_ACCOUNT, payload: { ...account } });
    dispatch(fetchCardsByAccountId(account.id));
    setSelectedAccount({ ...account });
  };

  const enableOrDisableAccount = (account) => {
    const { id, enabled } = account;
    dispatch(
      enableOrDisableAccountAction({
        accountId: id,
        action: enabled ? "disable" : "enable",
      })
    );
  };

  const enableOrDisableCard = (card) => {
    const { id, enabled } = card;
    dispatch(
      enableOrDisableCardAction({
        cardId: id,
        action: enabled ? "disable" : "enable",
      })
    );
  };

  const editClientChangeHandler = (event, field) => {
    setSelectedClient({ ...selectedClient, [field]: event.target.value });
  };

  const confirmChange = async () => {
    const res = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });
    if (res.isConfirmed) {
      const res = await dispatch(updateUserAction({ ...selectedClient }));
      setEditMode(res && res["id"] ? false : true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      {selectedClient && selectedClient.id ? (
        <CModal fullscreen visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader
            closeButton={false}
            style={{
              display: "block",
              paddingBottom: "1rem",
              textAlign: "center",
            }}
          >
            <CContainer>
              <CRow>
                <CCol md={8} lg={6} xl={4}>
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        disabled={!editMode}
                        placeholder="First Name"
                        autoComplete="First Name"
                        value={selectedClient.firstname || ""}
                        onChange={(e) =>
                          editClientChangeHandler(e, "firstname")
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        disabled={!editMode}
                        placeholder="CIN"
                        autoComplete="CIN"
                        value={selectedClient.cin || ""}
                        onChange={(e) => editClientChangeHandler(e, "cin")}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        disabled={!editMode}
                        placeholder="Address"
                        autoComplete="Address"
                        value={selectedClient.address || ""}
                        onChange={(e) => editClientChangeHandler(e, "address")}
                      />
                    </CInputGroup>
                  </CForm>
                </CCol>
                <CCol md={8} lg={6} xl={4}>
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        disabled={!editMode}
                        placeholder="Last Name"
                        autoComplete="Last Name"
                        value={selectedClient.lastname || ""}
                        onChange={(e) => editClientChangeHandler(e, "lastname")}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        disabled={!editMode}
                        placeholder="EMAIL"
                        autoComplete="EMAIL"
                        value={selectedClient.email || ""}
                        onChange={(e) => editClientChangeHandler(e, "email")}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        disabled={!editMode}
                        placeholder="BirthDay"
                        autoComplete="BirthDay"
                        value={selectedClient.birthday || ""}
                        onChange={(e) => editClientChangeHandler(e, "birthday")}
                      />
                    </CInputGroup>
                  </CForm>
                </CCol>
                <CCol md={8} lg={6} xl={4}>
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        disabled={!editMode}
                        placeholder="User Name"
                        autoComplete="User Name"
                        value={selectedClient.username || ""}
                        onChange={(e) => editClientChangeHandler(e, "username")}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        disabled={!editMode}
                        placeholder="Telephone"
                        autoComplete="Telephone"
                        value={selectedClient.phone || ""}
                        onChange={(e) => editClientChangeHandler(e, "phone")}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CFormSwitch
                        disabled={!editMode}
                        size="xl"
                        label={
                          (selectedClient.enabled ? "enable" : "disable") +
                          " Client"
                        }
                        checked={selectedClient.enabled}
                        onChange={(e) =>
                          setSelectedClient({
                            ...selectedClient,
                            enabled: e.target.checked,
                          })
                        }
                      />
                    </CInputGroup>
                  </CForm>
                </CCol>
              </CRow>
            </CContainer>
            <div style={{ textAlign: "right" }}>
              {editMode && (
                <CButton
                  className="mx-2"
                  color="primary"
                  onClick={() => confirmChange()}
                >
                  <CIcon icon={cilSave} />
                </CButton>
              )}
              <CButton
                className="mx-2"
                color="warning"
                onClick={() => setEditMode(!editMode)}
              >
                <CIcon icon={cilPencil} />
              </CButton>
            </div>
          </CModalHeader>
          <CModalBody>
            <CNav variant="pills" className="user-tabs">
              <CNavItem>
                <CNavLink
                  className="cursor-pointer"
                  active={activeTab === 1}
                  onClick={() => activeTabHandler(1)}
                >
                  <CIcon icon={cilCreditCard} className="me-2" />
                  Comptes
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  className="cursor-pointer"
                  active={activeTab === 2}
                  onClick={() => activeTabHandler(2)}
                >
                  <CIcon icon={cilSettings} className="me-2" />
                  Setting
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent className="rounded-bottom">
              <CTabPane className="p-3 preview" visible={activeTab === 1}>
                <CContainer>
                  <CRow>
                    <CCol md={8} lg={6} xl={6}>
                      {accountsByClient.length > 0 ? (
                        <ul className="list-group">
                          {accountsByClient.map((account) => (
                            <li
                              className={classNames(
                                "list-group-item d-flex justify-content-between align-items-center  cursor-pointer",
                                {
                                  active:
                                    selectedAccount &&
                                    selectedAccount.id === account.id,
                                }
                              )}
                              key={account.id}
                              onClick={() => getAccountInfo(account)}
                            >
                              {account["accountNumber"]}
                              <span className="badge badge-success badge-pill">
                                {account["type"]}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <EmptyData text="there is no account yet" />
                      )}
                    </CCol>
                    {selectedAccount && (
                      <CCol md={8} lg={6} xl={6}>
                        <div className="row">
                          <div className="col-md-11">
                            <CInputGroup>
                              <CInputGroupText>$</CInputGroupText>
                              <CFormInput
                                disabled={true}
                                value={selectedAccount.balance}
                              />
                            </CInputGroup>
                          </div>
                          <div className="col-md-1">
                            <CTooltip
                              content={
                                "click for " +
                                (selectedAccount.enabled
                                  ? "disable"
                                  : "enable") +
                                " this account"
                              }
                              placement="top"
                            >
                              <CButton
                                color={
                                  selectedAccount.enabled ? "success" : "danger"
                                }
                                shape="rounded-pill"
                                className="py-3 px-3 cursor-pointer"
                                onClick={() =>
                                  enableOrDisableAccount(selectedAccount)
                                }
                              ></CButton>
                            </CTooltip>
                          </div>
                        </div>
                        {cardsByClient.length > 0 ? (
                          <ul className="list-group mt-2">
                            {cardsByClient.map((card) => (
                              <CTooltip
                                content={
                                  card.type + "   " + card.dateExpiration
                                }
                                key={card.id}
                                placement="top"
                              >
                                <li
                                  className={
                                    "list-group-item d-flex justify-content-between align-items-center"
                                  }
                                >
                                  {card["cardNumber"]}
                                  <span className="badge badge-success badge-pill">
                                    <CButton
                                      color={
                                        card.enabled ? "success" : "danger"
                                      }
                                      shape="rounded-pill"
                                      className="py-3 px-3 cursor-pointer"
                                      onClick={() => enableOrDisableCard(card)}
                                    ></CButton>
                                  </span>
                                </li>
                              </CTooltip>
                            ))}
                          </ul>
                        ) : (
                          <div className="mt-3">
                            <EmptyData text="No cards available" />
                          </div>
                        )}
                      </CCol>
                    )}
                  </CRow>
                </CContainer>
              </CTabPane>
              <CTabPane className="p-3 preview" visible={activeTab === 2}>
                {"activeTab: " + activeTab}
              </CTabPane>
            </CTabContent>
          </CModalBody>
          <CModalFooter style={{ padding: "0rem 1rem" }}>
            <CButton onClick={() => setVisible(false)} color="secondary">
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      ) : (
        "loading ..."
      )}
    </>
  );
}

export default UserForm;
