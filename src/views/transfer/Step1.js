import React, { useState } from "react";
import UserList from "../users/UserList";
import ModalComptes from "./ModalComptes";

const Step1 = ({step, setStep}) => {
  const [modalCompteVisible, setModalCompteVisible] = useState(false);

  return (
    <>
      <UserList from={"modal"} step={step} setStep={setStep} />
      <ModalComptes
        visible={modalCompteVisible}
        setVisible={setModalCompteVisible}
        step={step}
        setStep={setStep}
      />
    </>
  );
};

export default Step1;
