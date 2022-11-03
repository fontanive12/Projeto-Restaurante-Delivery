import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ProductModal, Product, showProductCreateBox } from "../../components/modais/Product/ProductModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/ProductCards/Card";
import { Input } from "../../components/Input/input";

const ENDPOINT = `http://localhost:3000`;

export function ProductList() {
  const MySwal = withReactContent(Swal);
  const [stateList, setStateList] = useState<Product[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Product[]>("http://localhost:3000/products").then((response) => {
      setStateList(response.data);
    });
  }, [closeModal]);


  const showSwal = () => {
    showProductCreateBox()
  }



  const pdf = () => {
    axios.get(
      'http://localhost:3000/products/pdf',
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
      'http://localhost:3000/products/csv',
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

      <Header label="Produtos" />

      <MainContainer>
        <Header2Container>
          <Button width={150} height={40} label="Criar produto" onClick={showSwal} />
          <Button width={150} height={40} label="PDF" onClick={pdf} />
          <Button width={150} height={40} label="CSV" onClick={csv} />

        </Header2Container>
        {stateList.map((product) => {
          return <Card data={product} />;
        })}
      </MainContainer>
    </div>
  );
}