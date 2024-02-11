import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from "@coreui/react";
import React from "react";
import { Stepper } from "react-form-stepper";
import { useSelector } from "react-redux";
import NextStepFooter from "../transfer/NextStepFooter";
import Step0 from "../transfer/Step0";
import Step1 from "../transfer/Step1";
import Step2 from "../transfer/Step2";
 
export default function ModalTransferFromUser({
  visible,
  setVisible,
  step,
  setStep,
}) {
  const { dataSource, dataDestination, transferInfo } = useSelector(
    (state) => state["transferReducer"]
  );

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <CModal fullscreen visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader
          closeButton={false}
          style={{ display: "block", padding: "0" }}
        >
          <Stepper
            steps={[
              { label: "Source" },
              { label: "Destainataire" },
              { label: "confirmation" },
            ]}
            activeStep={step}
          />
        </CModalHeader>
        <CModalBody>
          {step === 0 && <Step0 step={step} setStep={setStep} />}
          {step === 1 && <Step1 step={step} setStep={setStep} />}
          {step === 2 && (
            <Step2
              setStep={setStep}
              dataSource={dataSource}
              dataDestination={dataDestination}
              transferInfo={transferInfo}
            />
          )}
        </CModalBody>
        <CModalFooter>
          <div>
            <CButton color="secondary" onClick={() => closeModal()}>
              Close
            </CButton>
          </div>
          <div>
            <NextStepFooter step={step} setStep={setStep} />
          </div>
        </CModalFooter>
      </CModal>
    </>
  );
};
