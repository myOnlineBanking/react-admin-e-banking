import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilMoney,
  cilPeople,
  cilCreditCard,
  cilSettings,
  cilTransfer,
  cilBank,
} from "@coreui/icons";
import { CNavItem } from "@coreui/react";
import { ROLE_ADMIN, ALL_ROLES } from "./constants";

const _nav = [
  {
    component: CNavItem,
    name: "Users",
    to: "/users",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    state: { role: ALL_ROLES },
  },
  {
    component: CNavItem,
    name: "Cards",
    to: "/cards",
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    state: { role: ALL_ROLES },
  },
  {
    component: CNavItem,
    name: "Transfers",
    to: "/transfers",
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
    state: { role: ALL_ROLES },
  },
  {
    component: CNavItem,
    name: "Accounts",
    to: "/accounts",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    state: { role: ALL_ROLES },
  },
  {
    component: CNavItem,
    name: "Agencies",
    to: "/agencies",
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
    state: { role: ROLE_ADMIN },
  },
  {
    component: CNavItem,
    name: "Settings",
    to: "/settings",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    state: { role: ROLE_ADMIN },
  },
];

export default _nav;
