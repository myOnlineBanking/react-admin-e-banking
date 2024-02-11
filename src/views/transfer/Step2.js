import React, { useState } from "react";
import { cilDollar } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CInputGroupText,
  CInputGroup,
  CFormInput,
  CForm,
  CFormSelect,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { SET_TRANSFERT_INFO } from "src/actions/types";

const Step2 = ({ dataSource, dataDestination, setStep }) => {
  return (
    <>
      <CRow className="mt-5">
        <CCol style={{ padding: "1rem 1rem" }}>
          <CardConfirmation
            setStep={setStep}
            header="Source"
            data={dataSource}
          />
        </CCol>
        <CCol style={{ padding: "1rem 1rem" }}>
          <CardConfirmation
            setStep={setStep}
            header="Destainataire"
            data={dataDestination}
          />
        </CCol>
        <CCol style={{ padding: "1rem 1rem" }}>
          <CardPrice />
        </CCol>
      </CRow>
    </>
  );
};

export default Step2;

const CardConfirmation = ({ data, header, setStep }) => {
  const { client, compte } = data;
  return (
    <>
      {data && client && compte && (
        <CCard className="text-center">
          <CCardHeader> {header} </CCardHeader>
          <CCardBody>
            <CCardTitle>
              {client.firstname + " - " + client.lastname + " - " + client.cin}
            </CCardTitle>
            <CCardText className="py-5">
              With supporting text below as a natural lead-in to additional
              content.
            </CCardText>
            <CButton
              onClick={() => setStep(header && header === "Source" ? 0 : 1)}
            >
              Modfier
            </CButton>
          </CCardBody>

          <CCardFooter className="text-medium-emphasis">
            {compte.accountNumber}
          </CCardFooter>
        </CCard>
      )}
    </>
  );
};

const CardPrice = () => {
  const [transferInfo, setTransferInfo] = useState({
    soustraction: "FROM_ME",
    price: 0,
    motif: "",
  });
  const dispatch = useDispatch();
  const dispatchTransferHandler = (value, field) => {
    setTransferInfo({ ...transferInfo, [field]: value });
    dispatch({ type: SET_TRANSFERT_INFO, payload: { value, field } });
  };
  return (
    <CCard className="text-center">
      <CCardHeader>
        <CInputGroup className="">
          <CInputGroupText component="label" htmlFor="inputGroupSelect01">
            Soustraction
          </CInputGroupText>
          <CFormSelect
            id="inputGroupSelect01"
            value={transferInfo.soustraction}
            onChange={(e) =>
              dispatchTransferHandler(e.target.value, "soustraction")
            }
          >
            <option value="FROM_ME"> From Source </option>
            <option value="FROM_OTHER">From Destinataire </option>
            <option value="FROM_BOTH"> Both </option>
          </CFormSelect>
        </CInputGroup>
      </CCardHeader>
      <CCardBody>
        <CCardText className="py-5">
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilDollar} />
              </CInputGroupText>
              <CFormInput
                placeholder="prix"
                value={transferInfo.price}
                onChange={(e) =>
                  dispatchTransferHandler(e.target.value, "price")
                }
              />
            </CInputGroup>
            <CInputGroup style={{ marginTop: "2.8rem" }}>
              <CInputGroupText>Motif</CInputGroupText>
              <CFormInput
                placeholder="Motif"
                value={transferInfo.motif}
                onChange={(e) =>
                  dispatchTransferHandler(e.target.value, "motif")
                }
              />
            </CInputGroup>
          </CForm>
        </CCardText>
      </CCardBody>

      <CCardFooter className="text-medium-emphasis">
        Lorem ipsum dolor sit amet.
      </CCardFooter>
    </CCard>
  );
};
