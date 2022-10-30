import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserModal, User } from "../../components/modais/User/UserModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "./User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/UserCards/Card";
import { Input } from "../../components/Input/input";
import express, { Express, Request, Response } from 'express';
import * as fs from 'fs';
import pdf from 'html-pdf';
import puppeteer from 'puppeteer';

export function UserList() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<User[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<User[]>("http://localhost:3000/users").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Criar usuário</strong>,

      html: <UserModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  


  return (
    <div>
      <Menu />

      <Header label="Usuários" />

      <MainContainer>
        <Header2Container>
          {/* <Input width={150} height={50} label={"Digite aqui"} id={"1"} errorMessage={"undefined"}/> */}

          {/* <Button width={120} height={50} label="Gerar PDF" onClick={generatePDF} /> */}
          <Button width={120} height={50} label="Criar Usuário" onClick={showSwal} />

        </Header2Container>
        {userList.map((user) => {
          return <Card data={user} />;
        })}
      </MainContainer>
    </div>
  );
}