import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
//  E-banking Components & pages
const Users = React.lazy(() => import("./views/users/Users"));
const UserForm = React.lazy(() => import("./views/users/UserForm"));

const CardsList = React.lazy(() => import("./views/cards/CardsList"));
const CardForm = React.lazy(() => import("./views/cards/CardForm"));
const UpdateCard = React.lazy(() => import("./views/cards/UpdateCard"));

const TransfersList = React.lazy(() =>
  import("./views/transfers/TransferList")
);

const AccountsList = React.lazy(() => import("./views/accounts/AccountsList"));
const AccountForm = React.lazy(() => import("./views/accounts/AccountForm"));
const UpdateAccount = React.lazy(() =>
  import("./views/accounts/UpdateAccount")
);

const AgenciesList = React.lazy(() => import("./views/agencies/AgenciesList"));
const AgencyForm = React.lazy(() => import("./views/agencies/AgencyForm"));

const Settings = React.lazy(() => import("./views/settings/Settings"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  {
    path: "/users",
    name: "users",
    component: Users,
    exact: true,
  },
  {
    path: "/users/{id}",
    name: "user-details",
    component: UserForm,
  },

  {
    path: "/cards",
    name: "Card List",
    component: CardsList,
  },
  {
    path: "/card",
    name: "Add card",
    component: CardForm,
  },
  { path: "/editCard", name: "Edit Card", component: UpdateCard },

  { path: "/transfers", name: "Transfer-list", component: TransfersList },

  { path: "/accounts", name: "Accounts-list", component: AccountsList },
  { path: "/account", name: "Add account", component: AccountForm },
  { path: "/editAccount", name: "Edit Account", component: UpdateAccount },

  {
    path: "/agencies",
    name: "agencies-list",
    component: AgenciesList,
  },
  {
    path: "/agency",
    name: "Add agency",
    component: AgencyForm,
  },

  {
    path: "/settings",
    name: "settings",
    component: Settings,
    private: true,
  },
];

export default routes;
