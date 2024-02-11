import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { Stepper } from "react-form-stepper";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import NextStepFooter from "./NextStepFooter";
import { useSelector } from "react-redux";

const ModalTransfer = ({ visible, setVisible, step, setStep  }) => {
  const { dataSource, dataDestination, transferInfo } = useSelector(
    (state) => state["transferReducer"]
  );

  const closeModal = () => {
    setVisible(false);
    setStep(0);
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

export default ModalTransfer;
