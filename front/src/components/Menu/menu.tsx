import { User, Atom, ForkKnife, Money, GlobeHemisphereEast, GlobeHemisphereWest, Hamburger, List } from "phosphor-react";

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
        <List size={62} />
        <NavLinkContainer>
          <NavbarLink to="/users">
            <User size={32} />
            <p>Usuários</p>
          </NavbarLink>

          <NavbarLink to="/categories">
            <ForkKnife size={32} />
            <p>Categorias</p>
          </NavbarLink>

          <NavbarLink to="/states">
            <GlobeHemisphereEast size={32} />
            <p>Estados</p>
          </NavbarLink>

          <NavbarLink to="/cities">
            <GlobeHemisphereWest size={32} />
            <p>Cidades</p>
          </NavbarLink>

          <NavbarLink to="/payments">
            <Money size={32} />
            <p>Forma de pagamento</p>
          </NavbarLink>

          <NavbarLink to="/products">
            <Hamburger size={32} />
            <p>Produtos</p>
          </NavbarLink>

        </NavLinkContainer>
      </ContentContainer>
    </MenuContainer>
  );
}
