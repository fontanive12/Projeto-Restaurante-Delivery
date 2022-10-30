import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { StateModal, State } from "../../components/modais/State/StateModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "./State.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/StateCards/Card";
import {Input} from "../../components/Input/input";

export function StateList() {
  const MySwal = withReactContent(Swal);
  const [stateList, setStateList] = useState<State[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<State[]>("http://localhost:3000/states").then((response) => {
      setStateList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Criar estado</strong>,
      html: <StateModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  return (
    <div>
      <Menu />

      <Header label="Estados" />

      <MainContainer>
        <Header2Container>
          {/* <Input width={150} height={50} label={"Digite aqui"} id={"1"} errorMessage={"undefined"}/> */}

        <Button width={120} height={50} label="Criar estado" onClick={showSwal} />

        </Header2Container>
        {stateList.map((state) => {
          return <Card data={state} />;
        })}
      </MainContainer>
    </div>
  );
}