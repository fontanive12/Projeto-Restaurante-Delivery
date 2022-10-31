import { FormEvent, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { User, ShoppingCartSimple, List } from "phosphor-react";
import { NavbarLink } from "../Menu/menu.styles";
import {
  ContentContainer,
  SidebarContainer,
  UserContainer,
  UserData,
  Title
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
        <Title>
          {/* <List size={32} /> */}
          <h1>{label}</h1>
        </Title>
        <UserContainer>
          <UserData>
            <User size={32} />
            <strong>{user?.name}</strong>
          </UserData>
          <ShoppingCartSimple size={32} />


          {/* <a href="../pages/Shop/shop">
            <ShoppingCartSimple size={40} />
          </a> */}
          <Button width={80} height={40} label="Sair" onClick={logout} />
        </UserContainer>
      </ContentContainer>
    </SidebarContainer>
  );
}