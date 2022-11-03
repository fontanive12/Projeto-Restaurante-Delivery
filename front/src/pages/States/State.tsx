import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { StateModal, State } from "../../components/modais/State/StateModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles"
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

  const pdf = () => {
    axios.get(
      'http://localhost:3000/states/pdf',
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
      'http://localhost:3000/states/csv',
      { responseType: 'blob' }
    ).then((response) => {
      const file = new Blob(
        [response.data],
        { type: 'text/csv;charset=utf-8;' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }

  return (
    <div>
      <Menu />

      <Header label="Estados" />

      <MainContainer>
        <Header2Container>
        <Button width={150} height={40} label="Criar estado" onClick={showSwal} />
          <Button width={150} height={40} label="PDF" onClick={pdf} />
          <Button width={150} height={40} label="CSV" onClick={csv} />
        </Header2Container>
        {stateList.map((state) => {
          return <Card data={state} />;
        })}
      </MainContainer>
    </div>
  );  
}