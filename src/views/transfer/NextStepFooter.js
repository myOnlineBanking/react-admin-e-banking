import React from "react";
import { CButton } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { createTransferAction } from "src/actions/transfertActions";

const NextStepFooter = ({ step, setStep }) => {
  const { dataSource, dataDestination, transferInfo } = useSelector(
    (state) => state["transferReducer"]
  );

  const dispatch = useDispatch();

  const transferHandler = () => {
    console.log(dataSource, dataDestination, transferInfo);
    const payload = {
      accountId: dataSource.compte["id"],
      destinationAccountId: dataDestination.compte["id"],
      amount: transferInfo.price,
      motif: transferInfo.motif,
      soustraction: transferInfo.soustraction,
    };
    dispatch(createTransferAction(payload));
  };

  if (step === 0) {
    return (
      <CButton
        disabled={!dataSource.compte}
        color="warning"
        onClick={() => setStep(1)}
      >
        Suivant
      </CButton>
    );
  }
  if (step === 1) {
    return (
      <CButton
        disabled={!dataDestination.compte}
        color="warning"
        onClick={() => setStep(2)}
      >
        Suivant
      </CButton>
    );
  }

  const { motif, price, soustraction } = transferInfo;
  if (step === 2) {
    return (
      <CButton
        disabled={
          motif.length < 4 || parseInt(price) <= 0 || soustraction.length < 4
        }
        color="primary"
        onClick={() => transferHandler()}
      >
        Enregistrer
      </CButton>
    );
  }
  if (step === undefined) {
    return <> step undefined </>;
  }
};

export default NextStepFooter;
