import { FormEvent, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { User } from "phosphor-react";
import { ShoppingCartSimple } from "phosphor-react";
import { NavbarLink } from "../Menu/menu.styles";
import {
  ContentContainer,
  SidebarContainer,
  UserContainer,
  UserData,
} from "./header.styles";
import { Button } from "../Button/button";

interface SidebarProps {
  label: string;
}

export function Header({ label }: SidebarProps) {
  const { user, logout } = useContext(AuthContext);

  return (
    <SidebarContainer>
      <ContentContainer>
        <h1>{label}</h1>
        <UserContainer>
          <UserData>
            <User size={32} />
            <strong>{user?.name}</strong>
          </UserData>
          <ShoppingCartSimple size={32} />


          {/* <a href="../pages/Shop/shop">
            <ShoppingCartSimple size={40} />
          </a> */}
          {/* <Button width={100} height={50} label="Sair" onClick={logout} /> */}
        </UserContainer>
      </ContentContainer>
    </SidebarContainer>
  );
}
// import { FormEvent, useContext, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { User } from "phosphor-react";
// import { FaBars } from "react-icons/fa"
// import { ShoppingCartSimple } from "phosphor-react";
// import { NavbarLink } from "../Menu/menu.styles";
// import {
//   ContentContainer,
//   SidebarContainer,
//   UserContainer,
//   UserData,
// } from "./header.styles";
// import { Button } from "../Button/button";
// import {Menu} from "../Menu/menu";

// interface SidebarProps {
//   label: string;
// }

// // const Header({ label }: SidebarProps) {

//   const Header = () => {

//   const [menu, setMenu] = useState(false);

//   const showMenu = () => setMenu(!menu);

//   const { user, logout } = useContext(AuthContext);

//   return (
//     <SidebarContainer>
//       <ContentContainer>
//         <FaBars onClick={showMenu} size={36}/>
//         {menu && <Menu active={setMenu} />}
//         <UserContainer>
//           <UserData>
//             <User size={32} />
//             <strong>{user?.name}</strong>
//           </UserData>
//           <ShoppingCartSimple size={32} />
//         </UserContainer>
//       </ContentContainer>
//     </SidebarContainer>
//   );
// }

// export default 