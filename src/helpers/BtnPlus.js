import React from "react";
import { CButton } from "@coreui/react";
import PropTypes from "prop-types"; 
import { Link } from "react-router-dom";

function BtnPlus({ pathname, label, status }) {
  return (
    <>
      {pathname && (
        <Link to={pathname}>
          <CButton color={status}>
            <i className="fa fa-plus mx-1"></i>
            {label}
          </CButton>
        </Link>
      )}
    </>
  );
}

BtnPlus.prototype = {
  pathname: PropTypes.string.isRequired,
  label: PropTypes.string,
};

BtnPlus.defaultProps = {
    status: "primary",
}

export default BtnPlus;
