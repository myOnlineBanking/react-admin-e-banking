import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { CBadge } from "@coreui/react";
import { useSelector } from "react-redux";
import { ALL_ROLES, ROLE_ADMIN } from "src/constants";

export const AppSidebarNav = ({ items }) => {
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, bgColor, state, ...rest } = item;
    const Component = component;
    return (
      <Component
        key={index}
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
            activeClassName: "active",
          })}
        {...rest}
      >
        {navLink(name, icon, badge, bgColor)}
      </Component>
    );
  };

  // const navGroup = (item, index) => {
  //   const { component, name, icon, to, ...rest } = item;
  //   const Component = component;
  //   return (
  //     <Component
  //       idx={String(index)}
  //       key={index}
  //       toggler={navLink(name, icon)}
  //       visible={location.pathname.startsWith(to)}
  //       {...rest}
  //     >
  //       {item.items?.map((item, index) =>
  //         item.items ? navGroup(item, index) : navItem(item, index)
  //       )}
  //     </Component>
  //   );
  // };

  let myItems = [...items];
  const authState = useSelector((state) => state["authReducer"]);
  if (authState && authState.user && authState.user['roles'].length > 0) {
    const user = authState.user;
    if (user.roles.includes(ALL_ROLES) || user.roles.includes(ROLE_ADMIN)) {
      myItems = [...items];
    } else {
      myItems = items.filter(
        (item) => item.state && item.state.role !== ROLE_ADMIN
      );
    }
  } 
  return (
    <React.Fragment>
      {myItems && myItems.map((item, index) => navItem(item, index))}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
