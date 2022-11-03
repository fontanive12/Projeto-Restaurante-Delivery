import { Header } from "../../components/Header/header";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CategoryModal, Category } from "../../components/modais/Category/CategoryModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/CategoryCards/Card";
import { Input } from "../../components/Input/input";

export function CategoryList() {
  const MySwal = withReactContent(Swal);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Category[]>("http://localhost:3000/categories").then((response) => {
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
      'http://localhost:3000/categories/pdf',
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
      'http://localhost:3000/categories/csv',
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
          <Button width={150} height={40} label="Criar categoria" onClick={showSwal} />
          <Button width={150} height={40} label="PDF" onClick={pdf} />
          <Button width={150} height={40} label="CSV" onClick={csv} />

        </Header2Container>


        {categoryList.map((category) => {
          return <Card data={category} />;
        })}
      </MainContainer>
    </div>
  );
}