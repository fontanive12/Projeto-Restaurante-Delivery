import { User, Atom } from "phosphor-react";

import {
  ContentContainer,
  MenuContainer,
  NavbarLink,
  NavLinkContainer,
} from "./menu.styles";

export function Menu() {
  return (
    <MenuContainer>
      <ContentContainer>
        <Atom size={62} />
        <NavLinkContainer>
          <NavbarLink to="/users">
            <User size={32} />
            <p>Usuários</p>
          </NavbarLink>

          <NavbarLink to="/categories">
            <User size={32} />
            <p>Categorias</p>
          </NavbarLink>

          <NavbarLink to="/states">
            <User size={32} />
            <p>Estados</p>
          </NavbarLink>

          <NavbarLink to="/cities">
            <User size={32} />
            <p>Cidades</p>
          </NavbarLink>

        </NavLinkContainer>
      </ContentContainer>
    </MenuContainer>
  );
}

// import { FormEvent, useContext } from "react";
// import { User, List, SignOut } from "phosphor-react";
// import { Button } from "../Button/button"
// import { AuthContext } from "../../contexts/AuthContext";

// import {
//   ContentContainer,
//   MenuContainer,
//   NavbarLink,
//   NavLinkContainer,
// } from "./menu.styles";

// export function Menu() {

//   const { user, logout } = useContext(AuthContext);
//   return (
//     <MenuContainer>
//       <ContentContainer>
//         <List size={56} />
//         <NavLinkContainer>
//           <NavbarLink to="/users">
//             <User size={32} />
//           </NavbarLink>

//           <NavbarLink to={"/login"}>
//             <SignOut size={32} />
//           </NavbarLink>

//           <Button width={50} height={50} label="Sair" onClick={logout} />
//         </NavLinkContainer>
//       </ContentContainer>
//     </MenuContainer>
//   );
// }


// import React from "react";
// import { FaTimes, FaHouseDamage, FaEnvelope } from "react-icons/fa";
// import { boolean } from "zod";
// import { MenuItem } from "./menuItem";
// import {
//   ContentContainer,
//   MenuContainer,
//   NavbarLink,
//   NavLinkContainer,
// } from "./menu.styles";

// const Menu = ({ active }:any) => {

//   const closeMenu = () => {
//     active(false)
//   }

// export function Menu() {

//   const { user, logout } = useContext(AuthContext);
//   return (
//     <MenuContainer menu={active}>
//       <FaTimes onClick={closeMenu}/>
//       <ContentContainer>


//       </ContentContainer>
//     </MenuContainer>
//   );
// }

// export default Menu;

// import React from 'react'
// import {
//   ContentContainer,
//   MenuContainer,
//   NavbarLink,
//   NavLinkContainer,
// } from "./menu.styles";

// import {
//   FaTimes,
//   FaHome,
//   FaEnvelope,
//   FaRegSun,
//   FaUserAlt,
//   FaIdCardAlt,
//   FaRegFileAlt,
//   FaRegCalendarAlt,
//   FaChartBar
// } from 'react-icons/fa'

// import SidebarItem from '../SidebarItem'

// const Sidebar = ({ active }: any) => {

//   const closeSidebar = () => {
//     active(false)
//   }

//   return (
//     <Container sidebar={active}>
//     <FaTimes onClick={closeSidebar} />  
//     <Content>
//       <SidebarItem Icon={FaHome} Text="Home" />
//       <SidebarItem Icon={FaChartBar} Text="Statistics" />
//       <SidebarItem Icon={FaUserAlt} Text="Users" />
//       <SidebarItem Icon={FaEnvelope} Text="Mail" />
//       <SidebarItem Icon={FaRegCalendarAlt} Text="Calendar" />
//       <SidebarItem Icon={FaIdCardAlt} Text="Employees" />
//       <SidebarItem Icon={FaRegFileAlt} Text="Reports" />
//       <SidebarItem Icon={FaRegSun} Text="Settings" />
//     </Content>
//   </Container>
//   )
// }

// export default Sidebar

