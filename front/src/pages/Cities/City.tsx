import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CityModal, City, showCityCreateBox } from "../../components/modais/City/CityModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
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

  const pdf = () => {
    axios.get(
      'http://localhost:3000/cities/pdf',
      { responseType: 'blob' }
    ).then((response) => {
      const file = new Blob(
        [response.data],
        { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }

  const csv = () => {
    axios.get(
      'http://localhost:3000/cities/csv',
      { responseType: 'blob' }
    ).then((response) => {
      const file = new Blob(
        [response.data],
        { type: 'application/csv' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }
  return (
    <div>
      <Menu />

      <Header label="Cidades" />

      <MainContainer>
        <Header2Container>
          <Button width={150} height={40} label="Criar cidade" onClick={showSwal} />
          <Button width={150} height={40} label="PDF" onClick={pdf} />
          <Button width={150} height={40} label="CSV" onClick={csv} />
        </Header2Container>
        {stateList.map((city) => {
          return <Card data={city} />;
        })}
      </MainContainer>
    </div>
  );
}