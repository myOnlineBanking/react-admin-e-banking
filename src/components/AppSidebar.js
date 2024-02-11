import React, { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import navigation from "../_nav";
import { Link } from "react-router-dom";
import ModalTransfer from "src/views/transfer/ModalTransfer";
import classNames from "classnames";
import { SET_TRANSFERT_INFO } from "src/actions/types";
import EbankingLogo from 'src/assets/e-banking-ensa.svg'

const AppSidebar = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
 
  const { sidebarShow, sidebarUnfoldable } = useSelector(
    (state) => state["userReducer"]
  );

  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={sidebarUnfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: "set", sidebarShow: visible });
        }}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">
          <Link to="/">
            <img
              src={EbankingLogo}
              style={{ height: "3.5em" }}
              alt="banking-logo"
            />
          </Link>
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <div className="text-center py-3">
              <CButton
                color="primary"
                className="cursor-pointer text-center  px-5"
                onClick={() => setVisible(true)}
              >
                Transfer Money
              </CButton>
            </div>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({ type: "set", payload: sidebarShow })}
        />
      </CSidebar>

      <TypeTransfer visible={visible} setVisible={setVisible} />
    </>
  );
};

export default memo(AppSidebar);

const TypeTransfer = ({ visible, setVisible }) => {

  const dispatch = useDispatch();

  const [types, setTypes] = useState([
    { id: 1, label: "Compte to Compte", default: true },
    { id: 2, label: "Cash to Compte", default: false },
    { id: 3, label: "Cash to Cash", default: false },
  ]);

  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [step, setStep] = useState(0);

  const changeTypeHandler=(type )=>{
      const myTypes = types.map((el) =>
        el.id === type.id ? { ...el, default: true } : { ...el, default:false }
      );
      setTypes(myTypes);
  }

  const nextByType = ( )=>{
    const selectedType= types.find((el) => el.default)
    dispatch({
      type: SET_TRANSFERT_INFO,
      payload: { field: "operationType", value: selectedType.label },
    });
    if(selectedType  && selectedType.label === 'Compte to Compte' ){

      setVisibleFullScreen(true)
    }   
  }


  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle> Type d&#39;operation </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ul className="list-group">
            {types &&
              types.length > 0 &&
              types.map((item) => (
                <li
                  key={item.id}
                  className={classNames("list-group-item cursor-pointer", {
                    active: item.default,
                  })}
                  onClick={() => changeTypeHandler(item)}
                >
                  {item.label}
                </li>
              ))}
          </ul>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => nextByType()}>
            Suivant
          </CButton>
        </CModalFooter>
      </CModal>

      <ModalTransfer
        visible={visibleFullScreen}
        setVisible={setVisibleFullScreen}
        step={step}
        setStep={setStep}
      />
    </>
  );
};
