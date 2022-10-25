import { Header } from "../../components/Header/header";
import { Menu } from "../../components/Menu/menu";
import { MainContainer } from "./home.styles";

import { useContext } from "react";
import { Button } from "../../components/Button/button";
import { AuthContext } from "../../contexts/AuthContext";

export function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Menu />
      <Header label="Home" />

      <MainContainer>

      </MainContainer>

    </div>
  );
}
