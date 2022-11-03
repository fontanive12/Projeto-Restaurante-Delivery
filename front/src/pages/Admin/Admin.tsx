import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AdminModal, Admin, showAdminCreateBox } from "../../components/modais/Admin/AdminModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "./Admin.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/AdminCard/Card";
import { Input } from "../../components/Input/input";
import express, { Express, Request, Response } from 'express';
import * as fs from 'fs';
import pdf from 'html-pdf';
import puppeteer from 'puppeteer';

const ENDPOINT = `http://localhost:3000`;

export function AdminList() {
  const MySwal = withReactContent(Swal);
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Admin[]>("http://localhost:3000/admins").then((response) => {
      setAdminList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    showAdminCreateBox();
  };

  const pdf = () => {
    axios.get(
      'http://localhost:3000/admins/pdf',
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
      'http://localhost:3000/admins/csv',
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
      <Header label="Funcionários" />
      <MainContainer>
        <Header2Container>
          <Button width={150} height={40} label="Criar funcionário" onClick={showSwal} />
          <Button width={150} height={40} label="PDF" onClick={pdf} />
          <Button width={150} height={40} label="CSV" onClick={csv} />
        </Header2Container>
        {adminList.map((admin) => {
          return <Card data={admin} />;
        })}
      </MainContainer>
    </div>
  );
}