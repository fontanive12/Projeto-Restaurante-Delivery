import { Header } from "../../components/Header/header";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, NavLinkContainer, NavbarLink, NavbarItem } from "./home.styles";
import { User, Atom } from "phosphor-react";
import { useContext } from "react";
import { Button } from "../../components/Button/button";
import { AuthContext } from "../../contexts/AuthContext";

export function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      {/* <Menu /> */}
      <Header label="Home" />

      <MainContainer>
        <NavLinkContainer>

          <NavbarLink to="/users">
            <NavbarItem>
              <h2>Usuários</h2>
              <User size={40} />
            </NavbarItem>
          </NavbarLink>

          <NavbarLink to="/categories">
            <NavbarItem>
              <h2>Categorias</h2>
              <User size={40} />
            </NavbarItem>
          </NavbarLink>

          <NavbarLink to="/states">
            <NavbarItem>
              <h2>Estados</h2>
              <User size={40} />
            </NavbarItem>
          </NavbarLink>

          <NavbarLink to="/cities">
            <NavbarItem>
              <h2>Cidades</h2>
              <User size={40} />
            </NavbarItem>
          </NavbarLink>

        </NavLinkContainer>


        <NavLinkContainer>
          <NavbarLink to="/cities">
            <NavbarItem>
              <h2>Cidades</h2>
              <User size={40} />
            </NavbarItem>
          </NavbarLink>

          <NavbarLink to="/cities">
            <NavbarItem>
              <h2>Cidades</h2>
              <User size={40} />
            </NavbarItem>
          </NavbarLink>

          <NavbarLink to="/cities">
            <NavbarItem>
              <h2>Cidades</h2>
              <User size={40} />
            </NavbarItem>
          </NavbarLink>

          <NavbarLink to="/cities">
            <NavbarItem>
              <h2>Cidades</h2>
              <User size={40} />
            </NavbarItem>
          </NavbarLink>

        </NavLinkContainer>
      </MainContainer>

    </div>
  );
}
