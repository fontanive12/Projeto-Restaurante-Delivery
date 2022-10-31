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

          <NavbarLink to="/payments">
            <User size={32} />
            <p>Forma de pagamento</p>
          </NavbarLink>

          <NavbarLink to="/products">
            <User size={32} />
            <p>Produtos</p>
          </NavbarLink>

        </NavLinkContainer>
      </ContentContainer>
    </MenuContainer>
  );
}
