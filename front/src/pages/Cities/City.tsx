import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CityModal, City, showCityCreateBox } from "../../components/modais/City/CityModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "./City.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/CityCards/Card";
import { Input } from "../../components/Input/input";

export function CityList() {
  const MySwal = withReactContent(Swal);
  const [stateList, setStateList] = useState<City[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<City[]>("http://localhost:3000/cities").then((response) => {
      setStateList(response.data);
    });
  }, [closeModal]);

  const getStates = () => {
    return axios.get(`localhost:3000/states`);
  }

  const showSwal = () => {
    showCityCreateBox()
  }

  return (
    <div>
      <Menu />

      <Header label="Cidades" />

      <MainContainer>
        <Header2Container>

          {/* <Input width={150} height={50} label={"Digite aqui"} id={"1"} errorMessage={"undefined"}/> */}

          <Button width={120} height={50} label="Criar cidade" onClick={showSwal} />

        </Header2Container>
        {stateList.map((city) => {
          return <Card data={city} />;
        })}
      </MainContainer>
    </div>
  );
}