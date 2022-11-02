import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserModal, User, showUserCreateBox } from "../../components/modais/User/UserModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "./User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/UserCards/Card";
import { Input } from "../../components/Input/input";
import express, { Express, Request, Response } from 'express';
import * as fs from 'fs';
import pdf from 'html-pdf';
import puppeteer from 'puppeteer';

const ENDPOINT = `http://localhost:3000`;


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
    showUserCreateBox();
  };

  const generatePdf = () => {
    window.open(`${ENDPOINT}/users/pdf`);
  }
  const generateCsv = () => {
    window.open(`${ENDPOINT}/users/csv`);
  }

  return (
    <div>
      <Menu />

      <Header label="Usuários" />

      <MainContainer>
        <Header2Container>
          <Button label="Criar Usuário" onClick={showSwal} />
          <Button label="PDF" onClick={generatePdf} />
          <Button label="PDF" onClick={generateCsv} />
        </Header2Container>
        {/* <div>
          <a href="http://localhost:3000/users/pdf" > PDF </a>
          <a href="http://localhost:3000/users/csv" target="_BLANK"> CSV </a>
        </div> */}
        {userList.map((user) => {
          return <Card data={user} />;
        })}
      </MainContainer>
    </div>
  );
}