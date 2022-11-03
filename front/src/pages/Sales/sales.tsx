import { Header } from "../../components/Header/header";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CategoryModal, Category } from "../../components/modais/Sale/SaleModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/CategoryCards/Card";
import { Input } from "../../components/Input/input";

export function SaleList() {
  const MySwal = withReactContent(Swal);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Category[]>("http://localhost:3000/sales").then((response) => {
      setCategoryList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Criar categoria</strong>,
      html: <CategoryModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  const pdf = () => {
    axios.get(
      'http://localhost:3000/sales/pdf',
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
      'http://localhost:3000/sales/csv',
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

      <Header label="Categorias" />
      <MainContainer>
        <Header2Container>
          <div>oi</div>

        </Header2Container>


        {categoryList.map((category) => {
          return <Card data={category} />;
        })}
      </MainContainer>
    </div>
  );
}