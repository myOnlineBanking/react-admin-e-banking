/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCardsNotAccepted } from "src/actions/cardActions";
import { getListTransfersAction } from "src/actions/transfertActions";
import { fetchAllUsers } from "src/actions/userActions";
import { getListAgenciesAction } from "src/actions/agencyAction";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";

const DefaultLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchCardsNotAccepted());
    dispatch(getListTransfersAction());
    dispatch(getListAgenciesAction());
  }, []);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
