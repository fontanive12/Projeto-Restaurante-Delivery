

// import React from "react";
// import * as Faicons from "react-icons/fa"
// import { NavbarContainer } from "./navbar.styles";

// export function Navbar() {
//     return (
//         <NavbarContainer>

//         </NavbarContainer>
//     )
// }

// export default Navbar;

import { User, Atom } from "phosphor-react";

import {
  ContentContainer,
  MenuContainer,
  NavbarLink,
  NavLinkContainer,
} from "./navbar.styles";

export function Menu() {
  return (
    <MenuContainer>
      <ContentContainer>
        <Atom size={62} />
        <NavLinkContainer>
          <NavbarLink to="/users">
            <User size={32} />
          </NavbarLink>
        </NavLinkContainer>
      </ContentContainer>
    </MenuContainer>
  );
}
