import React, { useEffect, useState } from "react";
import { CSmartTable } from "@coreui/react-pro";
import { useSelector } from "react-redux";
import { DateTimeFormat } from "src/helpers/DateTimeFormat";

const columns = [
  { key: "date", _style: { width: "20%" } },
  { key: "amount", _style: { width: "20%" } },
  { key: "accountFrom", _style: { width: "20%" } },
  { key: "accountTo", _style: { width: "20%" } },
  { key: "transferType", _style: { width: "20%" } },
  { key: "costType", _style: { width: "20%" } },
];

function TransferList() {

  const transferState = useSelector((state) => state["transferReducer"]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const transfers = transferState.transfers.map((el) => {
      el.date = DateTimeFormat(el.date);
      return el;
    });
    setList([...transfers]);
  }, [transferState.transfers]);
 
  return (
    <>
      <h4> Transfers List </h4>
      <hr />
      <CSmartTable
        columns={columns}
        items={list}
        itemsPerPage={8}
        columnFilter
        columnSorter
        pagination
        clickableRows
      />
    </>
  );
}

export default TransferList;
